'use strict';

(function (utils) {
  var mapSection = document.querySelector('.map');
  var form = mapSection.querySelector('.map__filters');
  var fields = form.querySelectorAll('select, fieldset');

  var activate = function () {
    fields.forEach(utils.unsetDisabled);
  };

  var deactivate = function () {
    fields.forEach(utils.setDisabled);
  };

  window.filter = {
    activate: activate,
    deactivate: deactivate,
  };
})(window.utils);
