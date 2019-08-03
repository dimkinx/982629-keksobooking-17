'use strict';

(function () {
  var map = window.import('*').from('ui.map');
  var filter = window.import('*').from('ui.filter');
  var form = window.import('*').from('ui.form');
  var renderAddress = window.import('renderAddress').from('ui.form');
  var initMainPin = window.import('initMainPin').from('ui.mainPin');

  map.deactivate();
  filter.deactivate();
  form.deactivate();

  var changePinHandler = function () {
    map.activate();
    filter.activate();
    form.activate();
  };

  var movePinHandler = function (coords) {
    renderAddress(coords);
  };

  initMainPin(changePinHandler, movePinHandler);
})();
