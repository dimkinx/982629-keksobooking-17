'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var form = mapSection.querySelector('.map__filters');
  var fields = form.querySelectorAll('select, fieldset');

  var activate = function () {
    fields.forEach(window.utils.unsetDisabled);
  };

  var deactivate = function () {
    fields.forEach(window.utils.setDisabled);
  };

  window.filter = {
    activate: activate,
    deactivate: deactivate,
  };
})();
