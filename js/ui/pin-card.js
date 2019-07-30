'use strict';

(function () {
  var offerTypeToCyrillic = window.import('offerTypeEnToRu').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');
  var domRef = window.import('*').from('util.domRef');

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var getRemainderOfNum = function (num) {
    if (num % 100 > 19) {
      return num % 10;
    }

    return num % 100;
  };

  var getEndingWords = function (num, nominative, genitiveSingular, genitivePlural) {
    if (getRemainderOfNum(num) === 0 || getRemainderOfNum(num) > 4) {
      return genitivePlural;
    }

    return getRemainderOfNum(num) === 1
      ? nominative
      : genitiveSingular;
  };

  var makeRoomsAndGuests = function (rooms, guests) {
    return rooms
      + ' '
      + getEndingWords(rooms, 'комната', 'комнаты', 'комнат')
      + ' для '
      + guests
      + ' '
      + getEndingWords(guests, 'гостя', 'гостей', 'гостей');
  };

  var createFeature = function (name) {
    var feature = document.createElement('li');
    feature.classList = 'popup__feature popup__feature--' + name;

    return feature;
  };

  var getFeatureFragment = makeFragmentRender(createFeature);

  var renderFeatures = function (element, features) {
    element.innerHTML = '';

    return features.length > 0
      ? element.appendChild(getFeatureFragment(features))
      : element.remove();
  };

  var createPhoto = function (url) {
    var cardPhoto = document.createElement('img');
    cardPhoto.src = url;
    cardPhoto.classList.add('popup__photo');
    cardPhoto.width = 45;
    cardPhoto.height = 40;
    cardPhoto.alt = 'Фотография жилья';

    return cardPhoto;
  };

  var getPhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (element, photos) {
    element.innerHTML = '';

    return photos.length > 0
      ? element.appendChild(getPhotoFragment(photos))
      : element.remove();
  };

  var createCard = function (ad) {
    var card = cardTemplateElement.cloneNode(true);
    var featuresElement = card.querySelector('.popup__features');
    var photosElement = card.querySelector('.popup__photos');

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + ' \u20bd/ночь';
    card.querySelector('.popup__type').textContent = offerTypeToCyrillic[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = makeRoomsAndGuests(ad.offer.rooms, ad.offer.guests);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;

    renderFeatures(featuresElement, ad.offer.features);
    renderPhotos(photosElement, ad.offer.photos);

    return card;
  };

  var renderCard = function (ad) {
    var card = createCard(ad);
    domRef.mapElement.insertBefore(card, domRef.filterContainerElement);
  };

  window.export({
    renderCard: renderCard,
  }).to('ui.card');
})();
