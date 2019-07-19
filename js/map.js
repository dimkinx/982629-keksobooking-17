'use strict';

(function (types, utils) {
  var mapSection = document.querySelector('.map');
  var pinsContainer = mapSection.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - types.PinSize.RADIUS) + 'px';
    pin.style.top = ad.location.y + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.type;

    return pin;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });

    pinsContainer.appendChild(fragment);
  };

  var renderPinsOnce = utils.once(function () {
    var loadHandler = function (pins) {
      renderPins(pins);
    };

    window.backend.load(loadHandler);
  });

  var activate = function () {
    mapSection.classList.remove('map--faded');

    renderPinsOnce();
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.map = {
    activate: activate,
    deactivate: deactivate,
  };
})(window.types, window.utils);
