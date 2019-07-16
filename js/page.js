'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var activate = function () {
    window.ad.activate();
    window.filter.activate();

    map.classList.remove('map--faded');

    window.mock.renderPins(pinsContainer, window.mock.getPins(window.constants.OFFERS_NUM));
  };

  var deactivate = function () {
    window.ad.deactivate();
    window.filter.deactivate();

    map.classList.add('map--faded');

    mainPin.addEventListener('mouseup', activate, {once: true});
  };

  deactivate();
  mainPin.addEventListener('mousedown', window.pin.mainPinDragStartHandler);
})();
