'use strict';

(function () {
  window.handlers = {
    errorHandler: function (message) {
      var notification = document.createElement('div');
      var styles = 'position: fixed;' +
        'background: rgba(255, 0, 0, 0.7);' +
        'color: rgba(255, 255, 255, .9);' +
        'bottom: 10px;' +
        'padding: 10px;' +
        'right: 10px;' +
        'min-width: 150px;';

      notification.setAttribute('style', styles);
      notification.innerHTML = message;
      document.querySelector('body').appendChild(notification);
    },
  };
})();
