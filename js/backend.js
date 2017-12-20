'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var message;

  window.backend = {
    load: function (onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status != 200) {
          message = xhr.status + ': ' + xhr.responseText;
          onError(message);
        } else {
          onLoad(xhr.responseText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка!')
      });

      xhr.addEventListener('timeout', function () {
        onError('Время ожидания ответа ' + xhr.timeout/1000 + ' секунд превышено!');
      });

      xhr.timeout = 5000;

      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status != 200) {
          message = xhr.status + ': ' + xhr.responseText;
          onError(message);
        } else {
          onLoad(xhr.response);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка!')
      });

      xhr.addEventListener('timeout', function () {
        onError('Время ожидания ответа ' + xhr.timeout/1000 + ' секунд превышено!');
      });

      xhr.timeout = 5000;

      xhr.open('POST', 'https://1510.dump.academy/keksobookin');
      xhr.send(data);
    },
  };
})();
