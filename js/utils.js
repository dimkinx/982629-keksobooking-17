'use strict';

(function () {
  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var makeDragStart = function (startHandler, moveHandler) {
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
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, {once: true});
    };
  };

  var makeDragOnce = function (dragHandler) {
    return function (evt) {
      evt.preventDefault();

      var mouseDragHandler = function (dragEvt) {
        dragEvt.preventDefault();
        document.removeEventListener('mousemove', mouseDragHandler);
        document.removeEventListener('mouseup', mouseDragHandler);
        dragHandler(dragEvt);
      };

      document.addEventListener('mousemove', mouseDragHandler);
      document.addEventListener('mouseup', mouseDragHandler);
    };
  };

  window.utils = {
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    makeDragStart: makeDragStart,
    makeDragOnce: makeDragOnce,
  };
})();
