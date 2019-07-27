'use strict';

(function () {
  var FilterParam = window.import('FilterParam').from('types');

  var form = document.querySelector('.map__filters');

  var getStateFilter = function (filter, ad) {
    return filter.value === ad.offer.type;
  };

  var isCheckPass = function (ad) {
    var filterElements = [];
    filterElements[0] = Array.prototype.slice.call(form.children).shift();

    return filterElements.every(function (filter) {
      return filter.value === 'any'
        ? true
        : getStateFilter(filter, ad);
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
