'use strict';

(function () {
  var FilterParam = window.import('FilterParam').from('types');

  var mapSection = document.querySelector('.map');
  var form = mapSection.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');

  var filtrateByType = function (data) {
    var typeValue = typeSelect.options[typeSelect.selectedIndex].value;

    return typeValue === 'any'
      ? data.slice(0, FilterParam.PINS_NUM)
      : data.filter(function (pin) {
        return String(pin.offer['type']) === typeValue;
      }).slice(0, FilterParam.PINS_NUM);
  };

  window.export({
    filtrate: filtrateByType,
  }).to('net.dataFilter');
})();
