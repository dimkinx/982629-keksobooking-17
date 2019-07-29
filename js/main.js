'use strict';

(function () {
  var page = window.import('*').from('ui.page');
  var renderAddress = window.import('renderAddress').from('ui.ad');
  var initMainPin = window.import('initMainPin').from('ui.mainPin');

  page.deactivate();

  var changePinHandler = function () {
    page.activate();
  };

  var movePinHandler = function (coords) {
    renderAddress(coords);
  };

  initMainPin(changePinHandler, movePinHandler);
})();
