'use strict';

(function () {
  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var once = function (fn) {
    var result;
    return function () {
      if (fn) {
        result = fn();
        fn = null;
      }
      return result;
    };
  };

  var makeDragStart = function (startHandler, moveHandler, endHandler) {
    return function (evt) {
      evt.preventDefault();

      var start = startHandler(evt);
      start.x = start.x || 0;
      start.y = start.y || 0;

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        moveHandler(
            start.x + moveEvt.clientX - evt.clientX,
            start.y + moveEvt.clientY - evt.clientY
        );
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        endHandler();
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, {once: true});
    };
  };

  window.utils = {
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    once: once,
    makeDragStart: makeDragStart,
  };
})();
