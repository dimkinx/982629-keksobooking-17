'use strict';

(function () {
  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var offerTypes = Object.keys(offerTypeToMinPrice);

  window.data = {
    offerTypeToMinPrice: offerTypeToMinPrice,
    offerTypes: offerTypes,
  };
})();
