'use strict';

(function () {
  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var isEscapeKey = function (evt) {
    return evt.key === 'Escape'
        || evt.key === 'Esc';
  };

  var isElementShown = function (element) {
    return !element.classList.contains('hidden');
  };

  window.export({
    isEnterKey: isEnterKey,
    isEscapeKey: isEscapeKey,
    isElementShown: isElementShown,
  }).to('util.predicates');
})();
