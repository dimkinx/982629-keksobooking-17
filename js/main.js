'use strict';

(function () {
  var deactivatePage = window.import('deactivate').from('ui.page');
  var activatePage = window.import('activate').from('ui.page');
  var renderAddress = window.import('renderAddress').from('ui.ad');
  var initMainPin = window.import('initMainPin').from('ui.pin');

  deactivatePage();

  var changePinHandler = function () {
    activatePage();
  };

  var movePinHandler = function (coords) {
    renderAddress(coords);
  };

  initMainPin(changePinHandler, movePinHandler);
})();
