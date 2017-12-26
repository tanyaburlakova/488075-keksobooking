'use strict';

(function () {
  window.synchronizeFields = function (currentValue, linkedElement, currentData, callback) {
    if (typeof callback === 'function') {
      var result = currentData[currentValue.id].data.indexOf(currentValue.value);

      callback(linkedElement, currentData[currentData[currentValue.id].linked].data[result]);
    }
  };
})();
