'use strict';

(function () {
  var OFFERS_NUM = 8;

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

  var MapBounders = {
    LEFT: 0,
    LEFT_WITHOUT_MAIN_PIN_RADIUS: -33,
    RIGHT: 1200,
    RIGHT_WITHOUT_MAIN_PIN_RADIUS: 1167,
    TOP: 130,
    BOTTOM: 630,
  };

  window.constants = {
    OFFERS_NUM: OFFERS_NUM,
    PinSize: PinSize,
    MainPinSize: MainPinSize,
    MapBounders: MapBounders,
  };
})();
