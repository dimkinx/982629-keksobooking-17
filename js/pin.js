'use strict';

(function (MainPinSize, MainPinRect, utils) {
  var mapSection = document.querySelector('.map');
  var mainPinButton = mapSection.querySelector('.map__pin--main');

  var getMainPinPosition = function (verticalPoint) {
    return {
      x: mainPinButton.offsetLeft + MainPinSize.RADIUS,
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
    x = Math.min(Math.max(x, MainPinRect.LEFT), MainPinRect.RIGHT);
    y = Math.min(Math.max(y, MainPinRect.TOP), MainPinRect.BOTTOM);

    renderMainPin(x, y);

    window.ad.renderAddress(getMainPinPosition(MainPinSize.HEIGHT));
  };

  var mainPinDragStartHandler = utils.makeDragStart(
      mainPinStartHandler,
      mainPinMoveHandler
  );

  var mainPinChangeHandler = function () {
    window.page.activate();
  };

  var mainPinDragOnceHandler = utils.makeDragOnce(mainPinChangeHandler);

  var initMainPin = function () {
    mainPinButton.addEventListener('mousedown', mainPinDragOnceHandler, {once: true});
    mainPinButton.addEventListener('mousedown', mainPinDragStartHandler);
  };

  window.pin = {
    getMainPinPosition: getMainPinPosition,
    initMainPin: initMainPin,
  };
})(window.types.MainPinSize, window.types.MainPinRect, window.utils);
