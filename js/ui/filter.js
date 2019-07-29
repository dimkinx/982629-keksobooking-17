'use strict';

(function () {
  var PIN_MAX = window.import('PIN_MAX').from('constants');
  var dom = window.import('*').from('util.dom');
  var renderPins = window.import('renderPins').from('ui.pin');
  var removePins = window.import('removePins').from('ui.pin');
  var isElementShown = window.import('isElementShown').from('util.predicates');
  var loadData = window.import('load').from('net.backend');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var getFilteredAds = window.import('getFilteredAds').from('net.dataFilter');
  var debounce = window.import('debounce').from('util.debounce');

  var filterElement = document.querySelector('.map__filters-container');
  var filterForm = filterElement.querySelector('.map__filters');
  var inputElements = filterForm.querySelectorAll('.map__filter, .map__checkbox');

  var adsData = [];

  var filterChangeHandler = function () {
    removePins();
    renderPins(getFilteredAds(adsData));
  };

  var debouncedFilterChangeHandler = debounce(filterChangeHandler);

  var loadHandler = function (data) {
    adsData = data;

    renderPins(adsData.slice(0, PIN_MAX));
    inputElements.forEach(dom.unsetDisabled);
    dom.showElement(filterElement);

    filterForm.addEventListener('change', debouncedFilterChangeHandler);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage, tryButtonHandler);
    deactivate();
  };

  var tryButtonHandler = function () {
    activate();
  };

  var activate = function () {
    loadData(loadHandler, errorHandler);
  };

  var deactivate = function () {
    inputElements.forEach(dom.setDisabled);
    dom.hideElement(filterElement);

    if (isElementShown(filterElement)) {
      filterForm.removeEventListener('change', debouncedFilterChangeHandler);
    }
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.filter');
})();
