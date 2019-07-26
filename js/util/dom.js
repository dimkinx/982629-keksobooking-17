'use strict';

(function () {
  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var clearInput = function (input) {
    input.value = '';
  };

  var removeElement = function (element) {
    element.remove();
  };

  window.export({
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    showElement: showElement,
    hideElement: hideElement,
    clearInput: clearInput,
    removeElement: removeElement,
  }).to('util.dom');
})();
