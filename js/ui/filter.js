'use strict';

(function () {
  var dom = window.import('*').from('util.dom');
  var map = window.import('removePins', 'renderPins').from('ui.map');
  var loadData = window.import('load').from('net.backend');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var filtrate = window.import('filtrate').from('net.dataFilter');


  var filterElement = document.querySelector('.map__filters-container');
  var inputElements = filterElement.querySelectorAll('.map__filter, .map__checkbox');

  var pinsData = [];

  var loadHandler = function (data) {
    pinsData = data;
    map.renderPins(filtrate(pinsData));

    inputElements.forEach(dom.unsetDisabled);
    dom.showElement(filterElement);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage, tryButtonHandler);
    deactivate();
  };

  var tryButtonHandler = function () {
    activate();
  };

  var filterChangeHandler = function () {
    map.removePins();
    map.renderPins(filtrate(pinsData));
  };

  var activate = function () {
    loadData(loadHandler, errorHandler);

    inputElements.forEach(function (element) {
      element.addEventListener('change', filterChangeHandler);
    });
  };

  var isElementShown = function (elementCheck) {
    return !elementCheck.classList.contains('hidden');
  };

  var removeListener = function (elementCheck, elements, evtHandler) {
    return isElementShown(elementCheck) && elements.forEach(function (element) {
      element.removeEventListener('change', evtHandler);
    });
  };

  var deactivate = function () {
    inputElements.forEach(dom.setDisabled);
    dom.hideElement(filterElement);

    removeListener(filterElement, inputElements, filterChangeHandler);
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.filter');
})();
