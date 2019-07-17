'use strict';

(function (PinSize) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = ad.location.y + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.type;

    return pin;
  };

  var renderPins = function (target, pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });

    target.appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins,
  };
})(window.types.PinSize);
