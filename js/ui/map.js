'use strict';

(function () {
  var mapSection = document.querySelector('.map');

  var activate = function () {
    mapSection.classList.remove('map--faded');
  };

  var deactivate = function () {
    mapSection.classList.add('map--faded');
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.map');
})();
