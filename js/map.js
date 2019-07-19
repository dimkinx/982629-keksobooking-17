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

  var loadHandler = function (data) {
    renderPins(data);
  };

  var errorHandler = function (errorMessage) {
    window.message.error(errorMessage);
  };

  var drawPins = function () {
    window.backend.load(loadHandler, errorHandler);
  };

  var activate = function () {
    mapSection.classList.remove('map--faded');

    drawPins();
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.map = {
    activate: activate,
    deactivate: deactivate,
    drawPins: drawPins,
  };
})(window.types, window.utils);
