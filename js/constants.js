'use strict';

(function () {
  var PIN_MAX = 5;
  var DEBOUNCE_DELAY = 500;
  var DEFAULT_IMAGE = 'img/muffin-grey.svg';
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png',
  ];

  window.export({
    PIN_MAX: PIN_MAX,
    DEBOUNCE_DELAY: DEBOUNCE_DELAY,
    DEFAULT_IMAGE: DEFAULT_IMAGE,
    FILE_TYPES: FILE_TYPES,
  }).to('constants');
})();
