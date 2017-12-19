'use strict';

(function () {
  window.synchronizeFields = function (currentValue, linkedElement, callback) {

    if (typeof callback === 'function') {
      linkedElement.value = callback(currentValue, linkedElement);
    }
  };
})();
