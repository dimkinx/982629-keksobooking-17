'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mapElement = document.querySelector('.map');
  var filterContainerElement = mapElement.querySelector('.map__filters-container');
  var filterFormElement = filterContainerElement.querySelector('.map__filters');

  window.export({
    mainElement: mainElement,
    mapElement: mapElement,
    filterContainerElement: filterContainerElement,
    filterFormElement: filterFormElement,
  }).to('util.domRef');
})();
