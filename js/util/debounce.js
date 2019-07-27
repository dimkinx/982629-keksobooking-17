'use strict';

(function () {
  var DEBOUNCE_INTERVAL = window.import('DEBOUNCE_INTERVAL').from('types');

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.export({
    debounce: debounce,
  }).to('util.debounce');
})();
