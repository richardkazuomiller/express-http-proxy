'use strict';

const { skippedToNextResponses } = require('../../lib/skippedToNextResponses');

function sendUserRes(Container) {
  if (!Container.user.res.headersSent && !skippedToNextResponses.has(Container.proxy.res)) {
    if (Container.options.stream) {
      Container.proxy.res.pipe(Container.user.res);
    } else {
      Container.user.res.send(Container.proxy.resData);
    }
  }
  return Promise.resolve(Container);
}


module.exports = sendUserRes;

