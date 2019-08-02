'use strict';

(function () {
  var HousePrice = {
    LOW: 10000,
    HIGH: 50000,
  };

  var Request = {
    TIMEOUT: 10000,
    TYPE: 'json',
    Url: {
      GET: 'https://js.dump.academy/keksobooking/data',
      POST: 'https://js.dump.academy/keksobooking',
    },
    Method: {
      GET: 'GET',
      POST: 'POST',
    },
    Code: {
      OK: 200,
      MULTIPLE_CHOICES: 300,
    },
  };

  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40,
  };

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    RADIUS: 25,
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 33,
  };

  var MapRect = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };

  var MainPinRect = {
    TOP: MapRect.TOP,
    RIGHT: MapRect.RIGHT - MainPinSize.RADIUS,
    BOTTOM: MapRect.BOTTOM,
    LEFT: MapRect.LEFT - MainPinSize.RADIUS,
  };

  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var offerCapacityToRoomNumber = {
    0: [100],
    1: [3, 2, 1],
    2: [3, 2],
    3: [3],
  };

  var offerRoomNumberToCapacity = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0],
  };

  var offerTypeEnToRu = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };

  window.export({
    HousePrice: HousePrice,
    Request: Request,
    PhotoSize: PhotoSize,
    PinSize: PinSize,
    MainPinSize: MainPinSize,
    MapRect: MapRect,
    MainPinRect: MainPinRect,
    offerTypeToMinPrice: offerTypeToMinPrice,
    offerCapacityToRoomNumber: offerCapacityToRoomNumber,
    offerRoomNumberToCapacity: offerRoomNumberToCapacity,
    offerTypeEnToRu: offerTypeEnToRu,
  }).to('types');
})();
