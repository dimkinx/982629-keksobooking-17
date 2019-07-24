'use strict';

(function () {
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

  var makeDragStart = function (startHandler, moveHandler) {
    return function (evt) {
      evt.preventDefault();

      var start = startHandler(evt);

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

  var makeFragmentRender = function (render) {
    return function (dataList) {
      var fragment = document.createDocumentFragment();
      dataList.forEach(function (data, idx) {
        fragment.appendChild(render(data, idx));
      });

      return fragment;
    };
  };

  window.export({
    makeDragOnce: makeDragOnce,
    makeDragStart: makeDragStart,
    makeFragmentRender: makeFragmentRender,
  }).to('util.factories');
})();
