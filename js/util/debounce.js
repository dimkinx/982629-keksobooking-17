'use strict';

(function () {
  var DEBOUNCE_DELAY = window.import('DEBOUNCE_DELAY').from('constants');

  var debounce = function (delayHandler, delay) {
    delay = delay || DEBOUNCE_DELAY;

    var timeoutId = 0;

    return function () {
      var parameters = arguments;

      if (timeoutId > 0) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(function () {
        delayHandler.apply(null, parameters);
      }, delay);
    };
  };

  window.export({
    debounce: debounce,
  }).to('util.debounce');
})();
