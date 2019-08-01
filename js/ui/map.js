'use strict';

(function () {
  var mapElement = window.import('mapElement').from('util.domRef');
  var pinClickHandler = window.import('pinClickHandler').from('ui.filter');
  var activatePin = window.import('activatePin').from('ui.pin');

  var pinsDivElement = mapElement.querySelector('.map__pins');

  var isPin = function (element) {
    return element.className === 'map__pin';
  };

  var findPinElement = function (target) {
    if (isPin(target)) {
      return target;
    }

    return isPin(target.parentElement)
      ? target.parentElement
      : null;
  };

  var mapClickHandler = function (evt) {
    var pin = findPinElement(evt.target);

    if (pin === null) {
      return;
    }

    activatePin(pin);
    pinClickHandler(+pin.dataset.index);
  };

  var activate = function () {
    mapElement.classList.remove('map--faded');
    pinsDivElement.addEventListener('click', mapClickHandler);
  };

  var deactivate = function () {
    mapElement.classList.add('map--faded');
    pinsDivElement.removeEventListener('click', mapClickHandler);
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.map');
})();
