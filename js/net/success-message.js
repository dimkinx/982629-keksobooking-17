'use strict';

(function () {
  var isEscapeKey = window.import('isEscapeKey').from('util.predicates');
  var mainElement = window.import('mainElement').from('util.domRef');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var createSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);

    mainElement.appendChild(successElement);

    var close = function () {
      mainElement.removeChild(successElement);

      successElement.removeEventListener('click', overlayClickHandler);
      document.removeEventListener('keydown', escPressHandler);
    };

    var overlayClickHandler = function () {
      close();
    };

    var escPressHandler = function (evt) {
      return isEscapeKey(evt) && close();
    };

    successElement.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', escPressHandler);
  };

  window.export({
    createSuccessMessage: createSuccessMessage,
  }).to('net.successMessage');
})();
