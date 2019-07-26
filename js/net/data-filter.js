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

    return type === 'any'
      ? data
      : data.filter(function (ad) {
        return ad.offer.type === type;
      });
  };

  var getFilteredAds = function (data) {
    return filterType(data).slice(0, FilterParam.PIN_MAX);
  };

  window.export({
    getFilteredAds: getFilteredAds,
  }).to('net.dataFilter');
})();
