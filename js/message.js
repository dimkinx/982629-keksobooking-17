'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mainElementFirstChild = mainElement.firstChild;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var error = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    mainElement.insertBefore(errorElement, mainElementFirstChild);

    errorElement.querySelector('.error__message').textContent = errorMessage;

    var tryHandler = function () {
      errorElement.remove();
      window.map.drawPins();
    };

    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', tryHandler, {once: true});
  };

  window.message = {
    error: error,
  };
})();
