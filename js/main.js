'use strict';

var OFFERS_NUM = 8;

var offerTypesToMinPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

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
  HEIGHT: 65,
  HEIGHT_WITH_POINTER: 80,
};

var mapSection = document.querySelector('.map');
var pinsContainer = mapSection.querySelector('.map__pins');
var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPinButton = mapSection.querySelector('.map__pin--main');
var mapForm = mapSection.querySelector('.map__filters');
var mapFormFields = mapForm.querySelectorAll('select, fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTimeInSelect = adForm.querySelector('#timein');
var adFormTimeOutSelect = adForm.querySelector('#timeout');

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
      type: getRandomItem(Object.keys(offerTypesToMinPrice)),
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
  var pin = pinButton.cloneNode(true);
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

var getMainPinButtonPosition = function () {
  return {
    x: mainPinButton.offsetLeft + Math.ceil(MainPin.WIDTH / 2),
    y: mainPinButton.offsetTop + Math.ceil(MainPin.HEIGHT / 2),
  };
};

var renderAddress = function (location) {
  adFormAddressInput.value = location.x + ', ' + location.y;
};

var setDisabled = function (element) {
  element.disabled = true;
};

var deactivatePage = function () {
  adForm.classList.add('ad-form--disabled');
  mapSection.classList.add('map--faded');

  mapFormFields.forEach(setDisabled);
  adFormFields.forEach(setDisabled);
};

var unsetDisabled = function (element) {
  element.disabled = false;
};

var adFormPriceInputChangeHandler = function (evt) {
  var minPrice = offerTypesToMinPrice[evt.target.value];
  adFormPriceInput.min = minPrice;
  adFormPriceInput.placeholder = minPrice;
};

var adFormTimeInSelectChangeHandler = function () {
  adFormTimeInSelect.value = adFormTimeOutSelect.value;
};

var adFormTimeOutSelectChangeHandler = function () {
  adFormTimeOutSelect.value = adFormTimeInSelect.value;
};

var activatePage = function () {
  adForm.classList.remove('ad-form--disabled');
  mapSection.classList.remove('map--faded');

  mapFormFields.forEach(unsetDisabled);
  adFormFields.forEach(unsetDisabled);

  adFormTypeSelect.addEventListener('change', adFormPriceInputChangeHandler);
  adFormTimeInSelect.addEventListener('change', adFormTimeOutSelectChangeHandler);
  adFormTimeOutSelect.addEventListener('change', adFormTimeInSelectChangeHandler);
};

var mainPinButtonClickHandler = function () {
  activatePage();
  renderPins(pinsContainer, getPins(OFFERS_NUM));
  mainPinButton.removeEventListener('click', mainPinButtonClickHandler);
};

deactivatePage();
renderAddress(getMainPinButtonPosition());
mainPinButton.addEventListener('click', mainPinButtonClickHandler);
