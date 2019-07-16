'use strict';

var map = document.querySelector('.map');
var pinsContainer = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');

var activatePage = function () {
  window.ad.activate();
  window.filter.activate();

  map.classList.remove('map--faded');

  window.mock.renderPins(pinsContainer, window.mock.getPins(window.constants.OFFERS_NUM));
};

var deactivatePage = function () {
  window.ad.deactivate();
  window.filter.deactivate();

  map.classList.add('map--faded');

  document.addEventListener('mouseup', activatePage, {once: true});
};

deactivatePage();
mainPin.addEventListener('mousedown', window.pin.mainPinDragStartHandler);
