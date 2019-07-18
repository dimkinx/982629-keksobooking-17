'use strict';

(function (utils, map, mock, pin, ad, filter) {
  var mapSection = document.querySelector('.map');
  var pinsContainer = mapSection.querySelector('.map__pins');
  var mainPinButton = mapSection.querySelector('.map__pin--main');

  var renderPinsOnce = utils.once(function () {
    map.renderPins(pinsContainer, mock.load());
  });

  var activate = function () {
    ad.activate();
    filter.activate();
    mapSection.classList.remove('map--faded');

    renderPinsOnce();
  };

  var deactivate = function () {
    ad.deactivate();
    filter.deactivate();
    mapSection.classList.add('map--faded');
  };

  deactivate();
  mainPinButton.addEventListener('mousedown', pin.mainPinDragStartHandler);

  window.page = {
    activate: activate,
  };
})(window.utils, window.map, window.mock, window.pin, window.ad, window.filter);
