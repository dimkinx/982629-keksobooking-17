'use strict';

(function (Keyboard) {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var noop = function () {};

  var error = function (errorMessage, callback) {
    callback = callback || noop;

    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorElement);

    var close = function () {
      mainElement.removeChild(errorElement);

      errorElement.querySelector('.error__button').removeEventListener('click', buttonClickHandler);
      errorElement.removeEventListener('click', overlayClickHandler);
      document.removeEventListener('keydown', escPressHandler);
    };

    var buttonClickHandler = function () {
      close();
      callback();
    };

    var overlayClickHandler = function () {
      close();
    };

    var escPressHandler = function (evt) {
      return Keyboard.isEscapeKey(evt) && close();
    };

    errorElement.querySelector('.error__button').addEventListener('click', buttonClickHandler);
    errorElement.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', escPressHandler);
  };

  window.message = {
    error: error,
  };
})(window.types.Keyboard);
