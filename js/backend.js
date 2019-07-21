'use strict';

(function (Request) {
  var createRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = Request.TYPE;
    xhr.timeout = Request.TIMEOUT;

    errorHandler = errorHandler || function (errorMessage) {
      throw new Error(errorMessage);
    };

    var isError = function () {
      return xhr.status < Request.Code.OK
          || xhr.status > Request.Code.MULTIPLE_CHOICES;
    };

    xhr.addEventListener('load', function () {
      if (isError(xhr)) {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        return;
      }

      loadHandler(xhr.response);
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = createRequest(loadHandler, errorHandler);
    xhr.open(Request.Method.GET, Request.Url.GET);
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = createRequest(loadHandler, errorHandler);
    xhr.open(Request.Method.POST, Request.Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})(window.types.Request);
