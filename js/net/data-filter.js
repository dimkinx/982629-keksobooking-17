'use strict';

(function () {
  var FilterParam = window.import('FilterParam').from('types');

  var form = document.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');

  var getTypeSelect = function () {
    return typeSelect.options[typeSelect.selectedIndex].value;
  };

  var filterType = function (data) {
    var type = getTypeSelect();

    return data.filter(function (ad) {
      return type === 'any'
        ? true
        : type === ad.offer.type;
    });
  };

  var getFilteredAds = function (data) {
    var filteredData = filterType(data);
    if (filteredData.length > FilterParam.PIN_MAX) {
      filteredData.length = FilterParam.PIN_MAX;
    }

    return filteredData;
  };

  window.export({
    getFilteredAds: getFilteredAds,
  }).to('net.dataFilter');
})();
