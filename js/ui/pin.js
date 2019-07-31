'use strict';

(function () {
  var PinSize = window.import('PinSize').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');
  var mapElement = window.import('mapElement').from('util.domRef');

  var pinsDivElement = mapElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplateElement.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
    pin.dataset.index = ad.id;
    image.src = ad.author.avatar;
    image.alt = ad.offer.title;

    return pin;
  };

  var getPinFragment = makeFragmentRender(createPin);

  var renderPins = function (ads) {
    pinsDivElement.appendChild(getPinFragment(ads));
  };

  var removePins = function () {
    pinsDivElement
      .querySelectorAll('button.map__pin:not(.map__pin--main)')
      .forEach(function (element) {
        element.remove();
      });
  };

  var setPinState = function (pin, active) {
    pin.classList[active ? 'add' : 'remove']('map__pin--active');
  };

  var activatePin = function (pin) {
    var activePin = pinsDivElement.querySelector('.map__pin--active');
    if (activePin !== null) {
      setPinState(activePin, false);
    }

    setPinState(pin, true);
  };
  window.export({
    renderPins: renderPins,
    removePins: removePins,
    activatePin: activatePin,
  }).to('ui.pin');
})();
