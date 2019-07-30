'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var filterContainerElement = mapElement.querySelector('.map__filters-container');
  var filterFormElement = filterContainerElement.querySelector('.map__filters');

  window.export({
    mapElement: mapElement,
    filterContainerElement: filterContainerElement,
    filterFormElement: filterFormElement,
  }).to('util.domRef');
})();
