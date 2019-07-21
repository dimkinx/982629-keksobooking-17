'use strict';

(function () {
  var loadHandler = function (data) {
    window.map.renderPins(data);
    window.filter.activate();
  };

  var errorHandler = function (errorMessage) {
    window.message.error(errorMessage, function () {
      loadPinsData();
    });
    window.filter.deactivate();
  };

  var loadPinsData = function () {
    window.backend.load(loadHandler, errorHandler);
  };

  window.data = {
    loadPinsData: loadPinsData,
  };
})();
