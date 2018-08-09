'use strict';
// модуль работы с сервером //
(function () {

  var SERVER_URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var SERVER_URL_POST = 'https://js.dump.academy/code-and-magick';
  var Code = {
    SUCCESSFUL: 200,
    REDIRECT: 300,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
  };
  var TIMEOUT = 10000;

  var uploadDataMessageError = function (message) {
    var node = document.createElement('div');
    node.classList.add('messege-error');
    node.textContent = message;

    var closeNode = document.createElement('button');
    closeNode.classList.add('messege-error-close');
    closeNode.textContent = 'Попробовать еще раз';

    closeNode.addEventListener('click', function () {
      window.location.reload();
    });

    node.appendChild(closeNode);
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var setupInquiry = function (onLoad) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESSFUL) {
        onLoad(xhr.response);
      } else {
        uploadDataMessageError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var messageError = '';
      switch (xhr.status) {
        case Code.REDIRECT:
          messageError = 'Ресурс переехал';
          break;

        case Code.BAD_REQUEST:
          messageError = 'Неправильный запрос';
          break;

        case Code.INTERNAL_SERVER_ERROR:
          messageError = 'Внутренняя ошибка сервера';
          break;

        default:
          messageError = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      uploadDataMessageError(messageError);
    });

    xhr.addEventListener('timeout', function () {
      uploadDataMessageError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;

  };

  var save = function (data, onLoad) {
    var xhr = setupInquiry(onLoad);
    xhr.open('POST', SERVER_URL_POST);
    xhr.send(data);
  };

  var load = function (onLoad) {
    var xhr = setupInquiry(onLoad);
    xhr.open('GET', SERVER_URL_GET);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load,
    uploadDataMessageError: uploadDataMessageError
  };

})();
