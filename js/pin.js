'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var getMainPinPosition = function (verticalPoint) {
    return {
      x: mainPin.offsetLeft + window.constants.MainPinSize.RADIUS,
      y: mainPin.offsetTop + verticalPoint,
    };
  };

  var limitingCoordinate = function (coordinate, min, max) {
    return Math.min(Math.max(coordinate, min), max);
  };

  var setMainPinPosition = function (x, y) {
    mainPin.style.left = limitingCoordinate(
        x,
        window.constants.MapBounders.LEFT_WITHOUT_MAIN_PIN_RADIUS,
        window.constants.MapBounders.RIGHT_WITHOUT_MAIN_PIN_RADIUS
    ) + 'px';
    mainPin.style.top = limitingCoordinate(
        y,
        window.constants.MapBounders.TOP,
        window.constants.MapBounders.BOTTOM
    ) + 'px';
  };

  var mainPinDragStartHandler = function (evt) {
    evt.preventDefault();

    var start = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop,
    };

    var shift = {
      x: 0,
      y: 0,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      shift.x = moveEvt.clientX - evt.clientX;
      shift.y = moveEvt.clientY - evt.clientY;

      setMainPinPosition(
          start.x + shift.x,
          start.y + shift.y
      );

      window.ad.renderAddress(getMainPinPosition(window.constants.MainPinSize.HEIGHT));
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, {once: true});
  };

  window.pin = {
    getMainPinPosition: getMainPinPosition,
    mainPinDragStartHandler: mainPinDragStartHandler,
  };
})();
