'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var makePin = function (id) {
    return {
      author: {
        avatar: 'img/avatars/user' + id + '.png',
      },
      offer: {
        type: getRandomItem(window.data.offerTypes),
      },
      location: {
        x: getRandomNumber(window.constants.MapBounders.LEFT, window.constants.MapBounders.RIGHT),
        y: getRandomNumber(window.constants.MapBounders.TOP, window.constants.MapBounders.BOTTOM),
      },
    };
  };

  var getPinIds = function (number) {
    return Array(number).fill(null).map(function (_, index) {
      index += 1;
      return index < 10 ? '0' + index : String(index);
    });
  };

  var getPins = function (number) {
    return getPinIds(number).map(makePin);
  };

  var createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = (ad.location.x - window.constants.PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y) + 'px';
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

  window.mock = {
    getPins: getPins,
    renderPins: renderPins,
  };
})();
