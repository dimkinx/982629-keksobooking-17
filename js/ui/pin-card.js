'use strict';

(function () {
  var types = window.import('*').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');
  var isEscapeKey = window.import('isEscapeKey').from('util.predicates');
  var domRef = window.import('*').from('util.domRef');
  var dom = window.import('*').from('util.dom');

  var createCard = function () {
    var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplateElement.cloneNode(true);
    domRef.mapElement.insertBefore(card, domRef.filterContainerElement);
    dom.hideElement(card);
  };

  createCard();

  var pinsElement = domRef.mapElement.querySelector('.map__pins');
  var cardElement = domRef.mapElement.querySelector('.map__card');
  var avatarElement = cardElement.querySelector('.popup__avatar');
  var titleElement = cardElement.querySelector('.popup__title');
  var addressElement = cardElement.querySelector('.popup__text--address');
  var priceElement = cardElement.querySelector('.popup__text--price');
  var typeElement = cardElement.querySelector('.popup__type');
  var capacityElement = cardElement.querySelector('.popup__text--capacity');
  var timeElement = cardElement.querySelector('.popup__text--time');
  var descriptionElement = cardElement.querySelector('.popup__description');
  var featuresListElement = cardElement.querySelector('.popup__features');
  var photosElement = cardElement.querySelector('.popup__photos');
  var closeButtonElement = cardElement.querySelector('.popup__close');

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

  var getCapacityContent = function (ad) {
    return ad.offer.rooms
      + ' '
      + getEndingWords(ad.offer.rooms, 'комната', 'комнаты', 'комнат')
      + ' для '
      + ad.offer.guests
      + ' '
      + getEndingWords(ad.offer.guests, 'гостя', 'гостей', 'гостей');
  };

  var createFeature = function (name) {
    var featureLIElement = document.createElement('li');
    featureLIElement.classList = 'popup__feature popup__feature--' + name;

    return featureLIElement;
  };

  var getFeatureFragment = makeFragmentRender(createFeature);

  var renderFeatures = function (element, features) {
    element.innerHTML = '';

    if (features.length > 0) {
      element.appendChild(getFeatureFragment(features));
    }
  };

  var createPhoto = function (url) {
    var photoElement = document.createElement('img');
    photoElement.src = url;
    photoElement.classList.add('popup__photo');
    photoElement.width = types.PhotoSize.WIDTH;
    photoElement.height = types.PhotoSize.HEIGHT;
    photoElement.alt = 'Фотография жилья';

    return photoElement;
  };

  var getPhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (element, photos) {
    element.innerHTML = '';

    if (photos.length > 0) {
      element.appendChild(getPhotoFragment(photos));
    }
  };

  var updateCard = function (ad) {
    avatarElement.src = ad.author.avatar;
    titleElement.textContent = ad.offer.title;
    addressElement.textContent = ad.offer.address;
    priceElement.textContent = ad.offer.price + ' \u20bd/ночь';
    typeElement.textContent = types.offerTypeEnToRu[ad.offer.type];
    capacityElement.textContent = getCapacityContent(ad);
    timeElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    descriptionElement.textContent = ad.offer.description;

    renderFeatures(featuresListElement, ad.offer.features);
    renderPhotos(photosElement, ad.offer.photos);
  };

  var closeCard = function () {
    var activePinButtonElement = pinsElement.querySelector('.map__pin--active');

    if (activePinButtonElement !== null) {
      activePinButtonElement.classList.remove('map__pin--active');
    }

    dom.hideElement(cardElement);
    closeButtonElement.removeEventListener('click', closeElementClickHandler);
    document.removeEventListener('keydown', escPressHandler);
  };

  var closeElementClickHandler = function () {
    closeCard();
  };

  var escPressHandler = function (evt) {
    return isEscapeKey(evt) && closeCard();
  };

  var showCard = function (ad) {
    updateCard(ad);
    dom.showElement(cardElement);

    document.addEventListener('keydown', escPressHandler);
    closeButtonElement.addEventListener('click', closeElementClickHandler);
  };

  window.export({
    updateCard: updateCard,
    showCard: showCard,
    closeCard: closeCard,
  }).to('ui.pinCard');
})();
