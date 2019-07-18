'use strict';

(function (types, utils, page, ad) {
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

  var activatePageOnce = utils.once(function () {
    page.activate();
  });

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

    ad.renderAddress(getMainPinPosition(types.MainPinSize.HEIGHT));
    activatePageOnce();
  };

  var mainPinEndHandler = function () {
    activatePageOnce();
  };

  var mainPinDragStartHandler = utils.makeDragStart(
      mainPinStartHandler,
      mainPinMoveHandler,
      mainPinEndHandler
  );

  window.pin = {
    getMainPinPosition: getMainPinPosition,
    mainPinDragStartHandler: mainPinDragStartHandler,
  };
})(window.types, window.utils, window.page, window.ad);
