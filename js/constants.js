'use strict';

(function () {
  var PIN_MAX = 5;
  var DEBOUNCE_DELAY = 500;

  window.export({
    PIN_MAX: PIN_MAX,
    DEBOUNCE_DELAY: DEBOUNCE_DELAY,
  }).to('constants');
})();
