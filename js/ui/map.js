'use strict';

(function () {
  var mapElement = window.import('mapElement').from('util.domRef');

  var activate = function () {
    mapElement.classList.remove('map--faded');
  };

  var deactivate = function () {
    mapElement.classList.add('map--faded');
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.map');
})();
