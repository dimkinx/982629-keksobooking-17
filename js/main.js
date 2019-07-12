'use strict';

var OFFERS_NUM = 8;

var MapScope = {
  X: {MIN: 0, MAX: 1200},
  Y: {MIN: 130, MAX: 630},
};

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70,
};

var MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  HEIGHT_WITH_POINTER: 80,
  RADIUS: 33,
};

var offerTypeToMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

var offerTypes = Object.keys(offerTypeToMinPrice);

var mapSection = document.querySelector('.map');
var pinsContainer = mapSection.querySelector('.map__pins');
var subPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = mapSection.querySelector('.map__pin--main');
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
      type: getRandomItem(offerTypes),
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
  var pin = subPin.cloneNode(true);
  var image = pin.querySelector('img');

  pin.style.left = (ad.location.x - PinSize.WIDTH / 2) + 'px';
  pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
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

var getMainPinPosition = function (verticalPoint) {
  return {
    x: mainPin.offsetLeft + MainPinSize.RADIUS,
    y: mainPin.offsetTop + verticalPoint,
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

  renderAddress(getMainPinPosition(MainPinSize.RADIUS));

  mainPin.addEventListener('mouseup', activatePage, {once: true});
};

var unsetDisabled = function (element) {
  element.disabled = false;
};

var adFormPriceInputChangeHandler = function (evt) {
  var minPrice = offerTypeToMinPrice[evt.target.value];
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

  renderAddress(getMainPinPosition(MainPinSize.HEIGHT_WITH_POINTER));

  renderPins(pinsContainer, getPins(OFFERS_NUM));
};

var limitingCoordinate = function (coordinate, min, max) {
  return Math.min(Math.max(coordinate, min), max);
};

var calcMainPinPosition = function (x, y) {
  mainPin.style.left = limitingCoordinate(
      x,
      MapScope.X.MIN - MainPinSize.RADIUS,
      MapScope.X.MAX - MainPinSize.RADIUS
  ) + 'px';
  mainPin.style.top = limitingCoordinate(
      y,
      MapScope.Y.MIN,
      MapScope.Y.MAX
  ) + 'px';
};

var mainPinDragStartHandler = function (evt) {
  evt.preventDefault();

  var start = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - evt.clientX,
      y: moveEvt.clientY - evt.clientY,
    };

    calcMainPinPosition(
        start.x + shift.x,
        start.y + shift.y
    );

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT_WITH_POINTER));
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler, {once: true});
};

deactivatePage();
mainPin.addEventListener('mousedown', mainPinDragStartHandler);
