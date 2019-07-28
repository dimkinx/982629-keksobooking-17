'use strict';

(function () {
  var PIN_MAX = window.import('PIN_MAX').from('constants');
  var PinSize = window.import('PinSize').from('types');
  var dom = window.import('*').from('util.dom');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');

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

  var getPinFragment = makeFragmentRender(createPin, PIN_MAX);

  var renderPins = function (pins) {
    pinsContainer.appendChild(getPinFragment(pins));
  };

  var removePins = function () {
    pinsContainer
      .querySelectorAll('button.map__pin:not(.map__pin--main)')
      .forEach(function (element) {
        dom.removeElement(element);
      });
  };

  var activate = function () {
    mapSection.classList.remove('map--faded');
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.export({
    renderPins: renderPins,
    removePins: removePins,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.map');
})();
