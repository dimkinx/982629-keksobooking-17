'use strict';

(function () {
  var mapElement = window.import('mapElement').from('util.domRef');
  var pinClickHandler = window.import('pinClickHandler').from('ui.filter');
  var activatePin = window.import('activatePin').from('ui.pin');
  var removePins = window.import('removePins').from('ui.pin');
  var pinCard = window.import('*').from('ui.pinCard');
  var isElementShown = window.import('isElementShown').from('util.predicates');

  var pinsElement = mapElement.querySelector('.map__pins');
  var cardElement = mapElement.querySelector('.map__card');

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
    pinsElement.addEventListener('click', mapClickHandler);
  };

  var deactivate = function () {
    if (isElementShown(cardElement)) {
      pinCard.closeCard();
    }
    removePins();
    mapElement.classList.add('map--faded');
    pinsElement.removeEventListener('click', mapClickHandler);
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.map');
})();
