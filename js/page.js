'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var pinsContainer = mapSection.querySelector('.map__pins');
  var mainPinButton = mapSection.querySelector('.map__pin--main');

  var renderPinsOnce = window.utils.once(function () {
    window.map.renderPins(pinsContainer, window.mock.load());
  });

  var activate = function () {
    window.ad.activate();
    window.filter.activate();
    mapSection.classList.remove('map--faded');

    renderPinsOnce();
  };

  var deactivate = function () {
    window.ad.deactivate();
    window.filter.deactivate();
    mapSection.classList.add('map--faded');
  };

  deactivate();
  mainPinButton.addEventListener('mousedown', window.pin.mainPinDragStartHandler);

  window.page = {
    activate: activate,
  };
})();