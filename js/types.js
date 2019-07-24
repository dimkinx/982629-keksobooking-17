'use strict';

(function () {
  var Request = {
    TIMEOUT: 1000,
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

  window.export({
    Request: Request,
    PinSize: PinSize,
    MainPinSize: MainPinSize,
    MapRect: MapRect,
    MainPinRect: MainPinRect,
    offerTypeToMinPrice: offerTypeToMinPrice,
  }).to('types');
})();
