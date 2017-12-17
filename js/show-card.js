'use strict';

(function () {
  window.showCard = function (card, callback) {
    card.classList.remove('hidden');

    if (typeof callback === 'function') {
      callback();
    }
  };
})();
