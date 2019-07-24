'use strict';

(function () {
  var renderPins = window.import('renderPins').from('ui.map');
  var filter = window.import('*').from('ui.filter');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var loadData = window.import('load').from('net.backend');

  var loadHandler = function (data) {
    renderPins(data);
    filter.activate();
  };

  var tryButtonHandler = function () {
    loadPinsData();
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage, tryButtonHandler);
    filter.deactivate();
  };

  var loadPinsData = function () {
    loadData(loadHandler, errorHandler);
  };

  window.export({
    loadPinsData: loadPinsData,
  }).to('net.data');
})();
