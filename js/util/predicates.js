'use strict';

(function () {
  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var isEscapeKey = function (evt) {
    return evt.key === 'Escape'
        || evt.key === 'Esc';
  };

  window.export({
    isEnterKey: isEnterKey,
    isEscapeKey: isEscapeKey,
  }).to('util.predicates');
})();
