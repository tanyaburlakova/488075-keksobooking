'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mapCardTemplate = document.querySelector('.map-elements-template').content.querySelector('.map__card');
  var mapCards = document.querySelector('.map');

  window.renderCards = function (apartments) {
    var template = function (card) {
      var mapElement = mapCardTemplate.cloneNode(true);
      var apartmentFuturiesList = mapElement.querySelector('.popup__features');
      apartmentFuturiesList.innerHTML = '';

      mapElement.querySelector('.popup__avatar').src = card.author.avatar;
      mapElement.getElementsByTagName('h3')[0].textContent = card.offer.title;
      mapElement.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';
      mapElement.getElementsByTagName('h4')[0].textContent = card.offer.type;
      mapElement.getElementsByTagName('p')[0].textContent = card.offer.rooms + ' для ' + card.offer.guests + ' гостей';
      mapElement.getElementsByTagName('p')[2].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
      mapElement.getElementsByTagName('p')[3].textContent = card.offer.description;
      mapElement.classList.add('hidden');

      card.offer.features.forEach(function (item, index) {
        var listElem = document.createElement('li');

        listElem.classList = 'feature feature--' + card.offer.features[index];

        apartmentFuturiesList.appendChild(listElem);
      });

      apartmentFuturiesList.replaceWith(apartmentFuturiesList);

      return mapElement;
    };

    apartments.forEach(function (item, index) {
      fragment.appendChild(template(apartments[index]));
    });

    mapCards.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };
})();
