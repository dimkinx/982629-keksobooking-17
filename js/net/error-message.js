'use strict';

(function () {
  var isEscapeKey = window.import('isEscapeKey').from('util.predicates');
  var mainElement = window.import('mainElement').from('util.domRef');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var createErrorMessage = function (errorMessage, tryButtonHandler) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.querySelector('.error__message').textContent = errorMessage;

    mainElement.appendChild(errorElement);

    var close = function () {
      mainElement.removeChild(errorElement);

      errorButton.removeEventListener('click', buttonClickHandler);
      errorElement.removeEventListener('click', overlayClickHandler);
      document.removeEventListener('keydown', escPressHandler);
    };

    var buttonClickHandler = function () {
      close();
      tryButtonHandler();
    };

    var overlayClickHandler = function () {
      close();
    };

    var escPressHandler = function (evt) {
      return isEscapeKey(evt) && close();
    };

    errorButton.addEventListener('click', buttonClickHandler);
    errorElement.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', escPressHandler);
  };

  window.export({
    createErrorMessage: createErrorMessage,
  }).to('net.errorMessage');
})();
