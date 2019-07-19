'use strict';

(function (utils) {
  var footerElement = document.querySelector('footer');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var error = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    utils.insertAfter(errorElement, footerElement);

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
})(window.utils);
