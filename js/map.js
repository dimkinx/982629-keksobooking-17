'use strict';

(function (PinSize) {
  var mapSection = document.querySelector('.map');
  var pinsContainer = mapSection.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.title;

    return pin;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });

    pinsContainer.appendChild(fragment);
  };

  var activate = function () {
    mapSection.classList.remove('map--faded');
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.map = {
    renderPins: renderPins,
    activate: activate,
    deactivate: deactivate,
  };
})(window.types.PinSize);
