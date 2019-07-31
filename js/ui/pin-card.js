'use strict';

(function () {
  var offerTypeEnToRu = window.import('offerTypeEnToRu').from('types');
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

  var pinsDivElement = domRef.mapElement.querySelector('.map__pins');
  var cardElement = domRef.mapElement.querySelector('.map__card');
  var avatarImageElement = cardElement.querySelector('.popup__avatar');
  var titleHeadingElement = cardElement.querySelector('.popup__title');
  var addressParagraphElement = cardElement.querySelector('.popup__text--address');
  var priceParagraphElement = cardElement.querySelector('.popup__text--price');
  var typeHeadingElement = cardElement.querySelector('.popup__type');
  var capacityParagraphElement = cardElement.querySelector('.popup__text--capacity');
  var timeParagraphElement = cardElement.querySelector('.popup__text--time');
  var descriptionParagraphElement = cardElement.querySelector('.popup__description');
  var featuresUListElement = cardElement.querySelector('.popup__features');
  var photosDivElement = cardElement.querySelector('.popup__photos');
  var closeButtonElement = cardElement.querySelector('.popup__close');

  var ads = [];

  var initCardAds = function (data) {
    ads = data;
  };

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
    var photoImageElement = document.createElement('img');
    photoImageElement.src = url;
    photoImageElement.classList.add('popup__photo');
    photoImageElement.width = 45;
    photoImageElement.height = 40;
    photoImageElement.alt = 'Фотография жилья';

    return photoImageElement;
  };

  var getPhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (element, photos) {
    element.innerHTML = '';

    if (photos.length > 0) {
      element.appendChild(getPhotoFragment(photos));
    }
  };

  var updateCard = function (ad) {
    avatarImageElement.src = ad.author.avatar;
    titleHeadingElement.textContent = ad.offer.title;
    addressParagraphElement.textContent = ad.offer.address;
    priceParagraphElement.textContent = ad.offer.price + ' \u20bd/ночь';
    typeHeadingElement.textContent = offerTypeEnToRu[ad.offer.type];
    capacityParagraphElement.textContent = getCapacityContent(ad);
    timeParagraphElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    descriptionParagraphElement.textContent = ad.offer.description;

    renderFeatures(featuresUListElement, ad.offer.features);
    renderPhotos(photosDivElement, ad.offer.photos);
  };

  var closeCard = function () {
    var activePinButtonElement = pinsDivElement.querySelector('.map__pin--active');

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

  var pinClickHandler = function (id) {
    var ad = ads[id];

    if (!cardElement.classList.contains('hidden')) {
      updateCard(ad);
    }

    showCard(ad);
  };

  window.export({
    initCardAds: initCardAds,
    pinClickHandler: pinClickHandler,
    closeCard: closeCard,
  }).to('ui.pinCard');
})();
