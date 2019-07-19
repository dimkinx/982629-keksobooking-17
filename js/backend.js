'use strict';

(function (Req) {
  var createRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = Req.TYPE;
    xhr.timeout = Req.TIMEOUT;

    errorHandler = errorHandler || function (errorMessage) {
      throw new Error(errorMessage);
    };

    var isError = function () {
      return xhr.status < Req.Code.OK
          || xhr.status > Req.Code.MULTIPLE_CHOICES;
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
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = createRequest(loadHandler, errorHandler);
    xhr.open(Req.Method.GET, Req.Url.GET);
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = createRequest(loadHandler, errorHandler);
    xhr.open(Req.Method.POST, Req.Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})(window.types.Req);
