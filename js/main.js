'use strict';

var OFFERS_NUM = 8;

var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var MapScope = {
  X: {MIN: 0, MAX: 1200},
  Y: {MIN: 130, MAX: 630},
};

var Pin = {
  WIDTH: 50,
  HEIGHT: 70,
};

var MapPinMainLocation = {
  x: Math.floor(MapScope.X.MAX / 2),
  y: Math.floor(MapScope.Y.MAX / 2),
};

var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPinMain = document.querySelector('.map__pin--main');
var formsElements = document.querySelectorAll('.map__filters select, .map__filters fieldset, .ad-form fieldset');

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
      type: getRandomItem(OFFER_TYPES),
    },
    location: {
      x: getRandomNumber(MapScope.X.MIN, MapScope.X.MAX),
      y: getRandomNumber(MapScope.Y.MIN, MapScope.Y.MAX),
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
  var pin = mapPin.cloneNode(true);
  var image = pin.querySelector('img');

  pin.style.left = (ad.location.x - Pin.WIDTH / 2) + 'px';
  pin.style.top = (ad.location.y - Pin.HEIGHT) + 'px';
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

var setValueAddress = function (x, y) {
  document.querySelector('input[name=address]').value = x + ', ' + y;
};

var deactivateFormsElements = function (array) {
  array.forEach(function (element) {
    return element.setAttribute('disabled', true);
  });
};

var activateFormsElements = function (array) {
  array.forEach(function (element) {
    return element.removeAttribute('disabled');
  });
};

var mapPinMainClickHandler = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  renderPins(mapPins, getPins(OFFERS_NUM));
  activateFormsElements(formsElements);

  mapPinMain.removeEventListener('click', mapPinMainClickHandler);
};

setValueAddress(MapPinMainLocation.x, MapPinMainLocation.y);
deactivateFormsElements(formsElements);
mapPinMain.addEventListener('click', mapPinMainClickHandler);
