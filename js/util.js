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
  };
})();
