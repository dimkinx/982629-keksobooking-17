'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mainPinButton = mapSection.querySelector('.map__pin--main');

  var activate = function () {
    window.ad.activate();
    window.filter.activate();
    mapSection.classList.remove('map--faded');
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
