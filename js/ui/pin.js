'use strict';

(function () {
  var PinSize = window.import('PinSize').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');
  var mapElement = window.import('mapElement').from('util.domRef');

  var pinsElement = mapElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (ad) {
    var pin = pinTemplateElement.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
    image.src = ad.author.avatar;
    image.alt = ad.offer.title;

    return pin;
  };

  var getPinFragment = makeFragmentRender(createPin);

  var renderPins = function (ads) {
    pinsElement.appendChild(getPinFragment(ads));
  };

  var removePins = function () {
    pinsElement
      .querySelectorAll('button.map__pin:not(.map__pin--main)')
      .forEach(function (element) {
        element.remove();
      });
  };
  window.export({
    renderPins: renderPins,
    removePins: removePins,
  }).to('ui.pin');
})();
