'use strict';

var OFFERS_NUM = 8;

var OFFERS_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var MapScope = {
  X_MIN: 0,
  X_MAX: document.querySelector('.map').offsetWidth,
  Y_MIN: 130,
  Y_MAX: 630,
};

var Pin = {
  WIDTH: 50,
  HEIGHT: 70,
};

var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

var getRandomItem = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateDataList = function () {
  var dataList = [];

  for (var i = 1; i <= OFFERS_NUM; i++) {
    dataList.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        type: getRandomItem(OFFERS_TYPES),
      },
      location: {
        x: getRandomNumber(MapScope.X_MIN, MapScope.X_MAX),
        y: getRandomNumber(MapScope.Y_MIN, MapScope.Y_MAX),
      }
    });
  }

  return dataList;
};

var createPin = function (dataList) {
  var pin = mapPin.cloneNode(true);
  var image = pin.querySelector('img');

  pin.style.left = (dataList.location.x - Pin.WIDTH / 2) + 'px';
  pin.style.top = (dataList.location.y - Pin.HEIGHT) + 'px';
  image.src = dataList.author.avatar;
  image.alt = dataList.offer.type;

  return pin;
};

var renderPins = function (dataList) {
  var fragment = document.createDocumentFragment();

  dataList.forEach(function (data) {
    fragment.appendChild(createPin(data));
  });

  mapPins.appendChild(fragment);
};

renderPins(generateDataList());
