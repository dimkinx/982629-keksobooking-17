'use strict';

(function () {
  var PIN_MAX = window.import('PIN_MAX').from('constants');
  var HousePrice = window.import('HousePrice').from('types');
  var filterFormElement = window.import('filterFormElement').from('util.domRef');

  var featureFieldSet = filterFormElement.querySelector('#housing-features');
  var formChildrenElements = [];
  var checkedInputs = [];

  var filterEvery = Array.prototype.every;

  var priceToLimits = {
    low: function (ad) {
      return ad.offer.price < HousePrice.LOW;
    },
    middle: function (ad) {
      return ad.offer.price >= HousePrice.LOW && ad.offer.price < HousePrice.HIGH;
    },
    high: function (ad) {
      return ad.offer.price >= HousePrice.HIGH;
    },
  };

  var filterToRules = {
    'housing-type': function (ad, filter) {
      return ad.offer.type === filter.value;
    },
    'housing-price': function (ad, filter) {
      return priceToLimits[filter.value](ad);
    },
    'housing-rooms': function (ad, filter) {
      return ad.offer.rooms === +filter.value;
    },
    'housing-guests': function (ad, filter) {
      return ad.offer.guests === +filter.value;
    },
    'housing-features': function (ad) {
      return filterEvery.call(checkedInputs, function (checkbox) {
        return ad.offer.features.some(function (feature) {
          return feature === checkbox.value;
        });
      });
    },
  };

  var isCheckPass = function (ad) {
    return filterEvery.call(formChildrenElements, function (filter) {
      return filter === featureFieldSet.id
        ? filter.value === void 0 || filterToRules[filter.id](ad)
        : filter.value === 'any' || filterToRules[filter.id](ad, filter);
    });
  };

  var getFilteredAds = function (data) {
    formChildrenElements = filterFormElement.children;
    checkedInputs = featureFieldSet.querySelectorAll('input[type=checkbox]:checked');

    return data.filter(isCheckPass).slice(0, PIN_MAX);
  };

  window.export({
    getFilteredAds: getFilteredAds,
  }).to('net.dataFilter');
})();
