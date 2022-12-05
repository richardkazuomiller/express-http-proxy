'use strict';

var express = require('express');
var request = require('supertest');
var proxy = require('../');
var http = require('http');
var assert = require('assert');

describe('when skipToNextHandlerFilter is defined', function () {
  this.timeout(10000);

  let app;
  let serverWith402;
  let serverWith200;
  let serverWith400;

  beforeEach(() => {
    app = express();
    const target404 = express();
    target404.use((req, res) => { res.status(404).send(''); });
    serverWith200 = target404.listen(12345);
    const target402 = express();
    target402.use((req, res) => { res.status(402).send(''); });
    serverWith402 = target402.listen(12346);
    const target400 = express();
    target400.use((req, res) => { res.status(400).send(''); });
    serverWith400 = target400.listen(12347);
  });

  afterEach((done) => {
    serverWith402.close(() => {
      serverWith400.close(() => {
        serverWith200.close(done);
      });
    });
  });

  const OUTCOMES = [
    { shouldSkip: true, expectedStatus: 200 },
    { shouldSkip: false, expectedStatus: 404 },
  ];

  OUTCOMES.forEach((outcome) => {
    describe(`and returns ${outcome.shouldSkip}`, () => {
      it(`express-http-proxy${outcome.shouldSkip ? ' skips ' : ' doesnt skip '}to next()`, (done) => {
        app.use('/proxy', proxy('http://127.0.0.1:12345', {
          skipToNextHandlerFilter(/* res */) {
            return outcome.shouldSkip;
          },
        }));

        app.use((req, res) => {
          setTimeout(() => {
            assert(res.expressHttpProxy instanceof Object);
            assert(res.expressHttpProxy.res instanceof http.IncomingMessage);
            assert(res.expressHttpProxy.req instanceof Object);
            res.sendStatus(200);
          }, 1000);
        });

        request(app)
          .get('/proxy')
          .expect(outcome.expectedStatus)
          .end(done);
      });
    });
  });

  describe('when two proxy are chained', () => {
    [true, false].forEach((parseReqBody) => {
      describe(`parseReqBody: ${parseReqBody}`, () => {
        it('should not use the status code of the first', (done) => {
          app.use('/proxy', proxy('http://127.0.0.1:12346', {
            parseReqBody,
            skipToNextHandlerFilter() {
              return Promise.resolve(true);
            },
          }));
          app.use((req, res, next) => {
            next();
          });
          app.use('/proxy', proxy('http://127.0.0.1:12347', { parseReqBody })); // expect 400

          request(app)
            .get('/proxy')
            .expect(400)
            .end(done);
        });
      });
    });
  });

});
