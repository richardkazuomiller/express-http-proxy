'use strict';
const { skippedToNextResponses } = require('../../lib/skippedToNextResponses');
function defaultSkipFilter(/* res */) {
  return false;
}

function maybeSkipToNextHandler(container) {
  var resolverFn = container.options.skipToNextHandlerFilter || defaultSkipFilter;

  return Promise
    .resolve(resolverFn(container.proxy.res))
    .then(function (shouldSkipToNext) {
      if (shouldSkipToNext) {
        container.user.res.expressHttpProxy = container.proxy;
        skippedToNextResponses.add(container.proxy.res);

        return Promise.reject();
      } else {
        return Promise.resolve(container);
      }
    });
}

module.exports = maybeSkipToNextHandler;
