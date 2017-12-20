'use strict';

(function () {
  window.util = {
    randomNumber: function (max, min) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    randomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    randomLengthArray: function (array) {
      var ramdomArray = [];
      var arrayLength = this.randomNumber(array.length - 1, 1);

      while (ramdomArray.length < arrayLength) {
        var newElem = this.randomItem(array);
        if (ramdomArray.indexOf(newElem) === -1) {
          ramdomArray.push(newElem);
        }
      }

      return ramdomArray;
    },

    classRemover: function (arr, className) {
      arr.forEach(function (item) {
        item.classList.remove(className);
      });
    },

    classAdder: function (arr, className) {
      arr.forEach(function (item) {
        item.classList.add(className);
      });
    },

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
