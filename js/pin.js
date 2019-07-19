'use strict';

(function (types, utils) {
  var mapSection = document.querySelector('.map');
  var mainPinButton = mapSection.querySelector('.map__pin--main');

  var getMainPinPosition = function (verticalPoint) {
    return {
      x: mainPinButton.offsetLeft + types.MainPinSize.RADIUS,
      y: mainPinButton.offsetTop + verticalPoint,
    };
  };

  var renderMainPin = function (x, y) {
    mainPinButton.style.left = x + 'px';
    mainPinButton.style.top = y + 'px';
  };

  var mainPinStartHandler = function () {
    return {
      x: mainPinButton.offsetLeft,
      y: mainPinButton.offsetTop,
    };
  };

  var mainPinMoveHandler = function (x, y) {
    x = Math.min(Math.max(x, types.MainPinRect.LEFT), types.MainPinRect.RIGHT);
    y = Math.min(Math.max(y, types.MainPinRect.TOP), types.MainPinRect.BOTTOM);

    renderMainPin(x, y);

    window.ad.renderAddress(getMainPinPosition(types.MainPinSize.HEIGHT));
    window.page.activateOnce();
  };

  var mainPinEndHandler = function () {
    window.page.activateOnce();
  };

  var mainPinDragStartHandler = utils.makeDragStart(
      mainPinStartHandler,
      mainPinMoveHandler,
      mainPinEndHandler
  );

  var initMainPin = function () {
    mainPinButton.addEventListener('mousedown', mainPinDragStartHandler);
  };

  window.pin = {
    getMainPinPosition: getMainPinPosition,
    initMainPin: initMainPin,
  };
})(window.types, window.utils);
