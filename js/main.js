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

var MainPin = {
  WIDTH: 65,
  HEIGHT: 80,
};

var mapSection = document.querySelector('.map');
var pinsContainer = mapSection.querySelector('.map__pins');
var pinButtonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPinButton = mapSection.querySelector('.map__pin--main');
var filtersForm = mapSection.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var formFields = [].concat(Array.from(filtersFormFields), Array.from(adFormFields));

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
  var pin = pinButtonTemplate.cloneNode(true);
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

var getMainPinButtonLocation = function () {
  return {
    x: mainPinButton.offsetLeft + Math.floor(MainPin.WIDTH / 2),
    y: mainPinButton.offsetTop + MainPin.HEIGHT,
  };
};

var renderAddress = function (location) {
  adFormAddressInput.value = location.x + ', ' + location.y;
};

var deactivateField = function (element) {
  element.disabled = true;
};

var activateField = function (element) {
  element.disabled = false;
};

var mainPinButtonClickHandler = function () {
  mapSection.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderPins(pinsContainer, getPins(OFFERS_NUM));
  formFields.forEach(activateField);

  mainPinButton.removeEventListener('click', mainPinButtonClickHandler);
};

renderAddress(getMainPinButtonLocation());
formFields.forEach(deactivateField);
mainPinButton.addEventListener('click', mainPinButtonClickHandler);
