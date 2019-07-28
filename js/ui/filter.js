'use strict';

(function () {
  var dom = window.import('*').from('util.dom');
  var map = window.import('removePins', 'renderPins').from('ui.map');
  var isElementShown = window.import('isElementShown').from('util.predicates');
  var loadData = window.import('load').from('net.backend');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var getFilteredAds = window.import('getFilteredAds').from('net.dataFilter');
  var debounce = window.import('debounce').from('util.debounce');

  var filterElement = document.querySelector('.map__filters-container');
  var inputElements = filterElement.querySelectorAll('.map__filter, .map__checkbox');

  var adsData = [];

  var filterChangeHandler = function () {
    map.removePins();
    map.renderPins(getFilteredAds(adsData));
  };

  var debouncedFilterChangeHandler = debounce(filterChangeHandler);

  var loadHandler = function (data) {
    adsData = data;
    map.renderPins(adsData);

    inputElements.forEach(dom.unsetDisabled);
    dom.showElement(filterElement);

    inputElements.forEach(function (element) {
      element.addEventListener('change', debouncedFilterChangeHandler);
    });
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

  var removeListener = function (elementCheck, elements, evtHandler) {
    return isElementShown(elementCheck) && elements.forEach(function (element) {
      element.removeEventListener('change', evtHandler);
    });
  };

  var deactivate = function () {
    inputElements.forEach(dom.setDisabled);
    dom.hideElement(filterElement);

    removeListener(filterElement, inputElements, debouncedFilterChangeHandler);
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.filter');
})();
