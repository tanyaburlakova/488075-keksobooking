'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('.map-elements-template').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  window.renderCards = function (apartments) {
    var template = function (data) {
      var card = cardTemplate.cloneNode(true);
      var apartmentFuturesList = card.querySelector('.popup__features');

      card.querySelector('.popup__avatar').src = data.author.avatar;
      card.getElementsByTagName('h3')[0].textContent = data.offer.title;
      card.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
      card.getElementsByTagName('h4')[0].textContent = data.offer.type;
      card.getElementsByTagName('p')[0].textContent = data.offer.rooms + ' для ' + data.offer.guests + ' гостей';
      card.getElementsByTagName('p')[2].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      card.getElementsByTagName('p')[3].textContent = data.offer.description;
      card.classList.add('hidden');
      apartmentFuturesList.innerHTML = '';

      data.offer.features.forEach(function (item, index) {
        var feature = document.createElement('li');

        feature.classList = 'feature feature--' + data.offer.features[index];

        apartmentFuturesList.appendChild(feature);
      });

      apartmentFuturesList.replaceWith(apartmentFuturesList);

      return card;
    };

    apartments.forEach(function (item, index) {
      fragment.appendChild(template(apartments[index]));
    });

    map.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };
})();
