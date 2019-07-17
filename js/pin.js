'use strict';

(function (MainPinSize, MainPinRect) {
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

  var activatePageOnce = window.utils.once(function () {
    window.page.activate();
  });

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
    activatePageOnce();
  };

  var mainPinEndHandler = function () {
    activatePageOnce();
  };

  var mainPinDragStartHandler = window.utils.makeDragStart(
      mainPinStartHandler,
      mainPinMoveHandler,
      mainPinEndHandler
  );

  window.pin = {
    getMainPinPosition: getMainPinPosition,
    mainPinDragStartHandler: mainPinDragStartHandler,
  };
})(window.types.MainPinSize, window.types.MainPinRect);
