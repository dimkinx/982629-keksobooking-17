'use strict';

(function () {
  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  window.utils = {
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
  };
})();
