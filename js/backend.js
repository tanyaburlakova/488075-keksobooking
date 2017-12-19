'use strict';

(function () {
  var xhr = new XMLHttpRequest();

  window.backend = {
    load: function (onLoad, onError) {
      xhr.addEventListener('load', function (event) {
        onLoad(xhr.responseText);

        return xhr.responseText;
      });

      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', 'https://1510.dump.academy/keksobooking');
      xhr.send(data);
    },
  }
})();
