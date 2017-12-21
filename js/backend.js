'use strict';

(function () {
  var TIMEOUT = 5000;
  var URL = 'https://1510.dump.academy/keksobooking';
  var message;

  var requestHandler = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status !== 200) {
        message = xhr.status + ': ' + xhr.responseText;
        onError(message);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа ' + xhr.timeout / 1000 + ' секунд превышено!');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = requestHandler(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = requestHandler(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
})();
