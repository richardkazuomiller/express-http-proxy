# 1.0.0 (2022-12-05)


### Bug Fixes

* do not send status code or headers for requests which were previously skipped by skipToNextHandlerFilter ([af61cca](https://github.com/richardkazuomiller/express-http-proxy/commit/af61ccae542471fb0387180e6cdb018add52bc4c))


### Reverts

* Revert "[#343]: Clarify test language and README re: proxyReqPathResolver (#346).  Reverted because 'wrong ticket number'." ([5548856](https://github.com/richardkazuomiller/express-http-proxy/commit/55488564a5701ac1acd2b1dcdc198e99d338f5e3)), closes [#343](https://github.com/richardkazuomiller/express-http-proxy/issues/343) [#346](https://github.com/richardkazuomiller/express-http-proxy/issues/346)
* Revert " Stream proxied responses if no response modifiers are in use (#311)" ([ba5b979](https://github.com/richardkazuomiller/express-http-proxy/commit/ba5b9791fce5cc126c73773f5496424d48b5621f)), closes [#311](https://github.com/richardkazuomiller/express-http-proxy/issues/311)
* Revert "fixing request options" ([7384423](https://github.com/richardkazuomiller/express-http-proxy/commit/738442385b51a545d224a4c0c6180b2704a45ec9))
