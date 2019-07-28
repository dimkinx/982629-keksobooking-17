'use strict';

(function () {
  var HousePrice = window.import('HousePrice').from('types');

  var form = document.querySelector('.map__filters');

  var filterEvery = Array.prototype.every;

  var priceToLimits = {
    low: function (ad) {
      return ad.offer.price < HousePrice.FIRST_LIMIT;
    },
    middle: function (ad) {
      return ad.offer.price >= HousePrice.FIRST_LIMIT && ad.offer.price < HousePrice.SECOND_LIMIT;
    },
    high: function (ad) {
      return ad.offer.price >= HousePrice.SECOND_LIMIT;
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
    'housing-features': function (ad, filter) {
      return filterEvery.call(filter.querySelectorAll('input[type=checkbox]:checked'), function (checkbox) {
        return ad.offer.features.some(function (feature) {
          return feature === checkbox.value;
        });
      });
    }
  };

  var isCheckPass = function (ad) {
    return filterEvery.call(form.children, function (filter) {
      return filter !== 'housing-features'
        ? filter.value === 'any' || filterToRules[filter.id](ad, filter)
        : filter.value === void 0 || filterToRules[filter.id](ad, filter);
    });
  };

  var getFilteredAds = function (data) {
    return data.filter(isCheckPass);
  };

  window.export({
    getFilteredAds: getFilteredAds,
  }).to('net.dataFilter');
})();
