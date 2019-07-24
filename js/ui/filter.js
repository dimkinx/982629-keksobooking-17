'use strict';

(function () {
  var dom = window.import('*').from('util.dom');

  var mapSection = document.querySelector('.map');
  var filterElement = mapSection.querySelector('.map__filters-container');
  var form = mapSection.querySelector('.map__filters');
  var fields = form.querySelectorAll('select, fieldset');

  var activate = function () {
    fields.forEach(dom.unsetDisabled);
    dom.showElement(filterElement);
  };

  var deactivate = function () {
    fields.forEach(dom.setDisabled);
    dom.hideElement(filterElement);
  };

  window.export({
    activate: activate,
    deactivate: deactivate,
  }).to('ui.filter');
})();
