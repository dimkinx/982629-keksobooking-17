'use strict';

(function () {
  var FilterParam = window.import('FilterParam').from('types');

  var form = document.querySelector('.map__filters');

  var getStateFilter = {
    'housing-type': function (ad, filter) {
      return ad.offer.type === filter.value;
    },
    'housing-price': function (ad, filter) {
      return ad.offer.price >= FilterParam.priceDict[filter.value].min
        && ad.offer.price < FilterParam.priceDict[filter.value].max;
    },
    'housing-rooms': function (ad, filter) {
      return ad.offer.rooms === +filter.value;
    },
    'housing-guests': function (ad, filter) {
      return ad.offer.guests === +filter.value;
    },
    'housing-features': function (ad, filter) {
      var checkboxElements = Array.prototype.slice.call(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkboxElements.every(function (checkbox) {
        return ad.offer.features.some(function (feature) {
          return feature === checkbox.value;
        });
      });
    }
  };

  var isCheckPass = function (ad) {
    var filterElements = Array.prototype.slice.call(form.children);

    return filterElements.every(function (filter) {
      return filter.value === 'any'
        ? true
        : getStateFilter[filter.id](ad, filter);
    });
  };

  var filterData = function (data) {
    return data.filter(isCheckPass);
  };

  var getFilteredAds = function (data) {
    var filteredData = filterData(data);
    if (filteredData.length > FilterParam.PIN_MAX) {
      filteredData.length = FilterParam.PIN_MAX;
    }

    return filteredData;
  };

  window.export({
    getFilteredAds: getFilteredAds,
  }).to('net.dataFilter');
})();
