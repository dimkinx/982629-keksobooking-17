'use strict';

(function () {
  var constants = window.import('*').from('constants');
  var types = window.import('*').from('types');
  var MainPinSize = window.import('MainPinSize').from('types');
  var domRef = window.import('*').from('util.domRef');
  var dom = window.import('unsetDisabled', 'setDisabled').from('util.dom');
  var getMainPinPosition = window.import('getMainPinPosition').from('ui.mainPin');
  var map = window.import('*').from('ui.map');
  var filter = window.import('*').from('ui.filter');
  var saveData = window.import('save').from('net.backend');
  var createSuccessMessage = window.import('createSuccessMessage').from('net.successMessage');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var resetMainPin = window.import('resetMainPin').from('ui.mainPin');

  var formElement = document.querySelector('.ad-form');
  var fieldSets = formElement.querySelectorAll('fieldset');
  var addressInput = formElement.querySelector('#address');
  var typeSelect = formElement.querySelector('#type');
  var priceInput = formElement.querySelector('#price');
  var timeInSelect = formElement.querySelector('#timein');
  var timeOutSelect = formElement.querySelector('#timeout');
  var roomNumberSelect = formElement.querySelector('#room_number');
  var capacitySelect = formElement.querySelector('#capacity');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var imagePreviewTemplate = document.querySelector('.ad-form__photo');
  var imageDropZone = document.querySelector('.ad-form__drop-zone');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var resetButton = formElement.querySelector('.ad-form__reset');

  var priceInputChangeHandler = function (evt) {
    var minPrice = types.offerTypeToMinPrice[evt.target.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var timeInSelectChangeHandler = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  var timeOutSelectChangeHandler = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var roomNumberChangeHandler = function () {
    capacitySelect.setCustomValidity('');
    return !types.offerRoomNumberToCapacity[roomNumberSelect.value].includes(+capacitySelect.value)
      ? roomNumberSelect.setCustomValidity('Количество комнат не соответствует количеству мест')
      : roomNumberSelect.setCustomValidity('');
  };

  var capacityChangeHandler = function () {
    roomNumberSelect.setCustomValidity('');
    return !types.offerCapacityToRoomNumber[capacitySelect.value].includes(+roomNumberSelect.value)
      ? capacitySelect.setCustomValidity('Количество мест не соответствует количеству комнат')
      : capacitySelect.setCustomValidity('');
  };

  var renderAddress = function (location) {
    addressInput.value = location.x + ', ' + location.y;
  };

  var changePinHandler = function () {
    map.activate();
    filter.activate();
    activate();
  };

  var resetUploadedImages = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function (photo) {
      photo.remove();
    });
    photoContainer.appendChild(imagePreviewTemplate);
    avatar.src = constants.DEFAULT_IMAGE;
  };

  var resetChangeHandler = function () {
    formElement.reset();
    domRef.filterFormElement.reset();

    resetMainPin(changePinHandler);
    priceInput.placeholder = '1000';
    resetUploadedImages();

    map.deactivate();
    filter.deactivate();
    deactivate();
  };

  var loadHandler = function () {
    createSuccessMessage();
    resetChangeHandler();
  };

  var tryButtonHandler = function () {
    saveData(new FormData(formElement), loadHandler, errorHandler);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage, tryButtonHandler);
  };

  var submitChangeHandler = function (evt) {
    evt.preventDefault();
    saveData(new FormData(formElement), loadHandler, errorHandler);
  };

  var loadFile = function (file, fileLoadHandler) {
    var fileName = file.name.toLowerCase();
    var matches = constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        fileLoadHandler(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var avatarLoadHandler = function (src) {
    avatar.src = src;
  };

  var avatarChooseHandler = function () {
    loadFile(avatarChooser.files[0], avatarLoadHandler);
  };

  var avatarDropHandler = function (evt) {
    evt.preventDefault();
    loadFile(evt.dataTransfer.files[0], avatarLoadHandler);
  };

  var renderImagePreview = function (url) {
    var nodeElement = document.createElement('div');
    var imageElement = document.createElement('img');
    imageElement.width = types.ImagePreviewSize.WIDTH;
    imageElement.height = types.ImagePreviewSize.HEIGHT;
    imageElement.style.borderRadius = types.ImagePreviewSize.BORDER_RADIUS + 'px';
    imageElement.src = url;
    imageElement.alt = 'Фотография жилья';
    nodeElement.appendChild(imageElement);
    nodeElement.classList.add('ad-form__photo');
    return nodeElement;
  };

  var imageLoadHandler = function (src) {
    imagePreviewTemplate.remove();
    photoContainer.appendChild(renderImagePreview(src));
  };

  var imageChooseHandler = function () {
    loadFile(imageChooser.files[0], imageLoadHandler);
  };

  var dragHandler = function (evt) {
    evt.preventDefault();
  };

  var imageDropHandler = function (evt) {
    evt.preventDefault();
    loadFile(evt.dataTransfer.files[0], imageLoadHandler);
  };

  var activate = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldSets.forEach(dom.unsetDisabled);

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT));

    avatarChooser.addEventListener('change', avatarChooseHandler);
    avatarDropZone.addEventListener('dragenter', dragHandler);
    avatarDropZone.addEventListener('dragover', dragHandler);
    avatarDropZone.addEventListener('drop', avatarDropHandler);
    typeSelect.addEventListener('input', priceInputChangeHandler);
    timeInSelect.addEventListener('input', timeOutSelectChangeHandler);
    timeOutSelect.addEventListener('input', timeInSelectChangeHandler);
    roomNumberSelect.addEventListener('input', roomNumberChangeHandler);
    capacitySelect.addEventListener('input', capacityChangeHandler);
    imageChooser.addEventListener('change', imageChooseHandler);
    imageDropZone.addEventListener('dragenter', dragHandler);
    imageDropZone.addEventListener('dragover', dragHandler);
    imageDropZone.addEventListener('drop', imageDropHandler);
    formElement.addEventListener('submit', submitChangeHandler);
    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      resetChangeHandler();
    }, {once: true});
  };

  var deactivate = function () {
    formElement.classList.add('ad-form--disabled');
    fieldSets.forEach(dom.setDisabled);

    renderAddress(getMainPinPosition(MainPinSize.RADIUS));

    avatarChooser.removeEventListener('change', avatarChooseHandler);
    avatarDropZone.removeEventListener('dragenter', dragHandler);
    avatarDropZone.removeEventListener('dragover', dragHandler);
    avatarDropZone.removeEventListener('drop', avatarDropHandler);
    typeSelect.removeEventListener('input', priceInputChangeHandler);
    timeInSelect.removeEventListener('input', timeOutSelectChangeHandler);
    timeOutSelect.removeEventListener('input', timeInSelectChangeHandler);
    roomNumberSelect.removeEventListener('input', roomNumberChangeHandler);
    capacitySelect.removeEventListener('input', capacityChangeHandler);
    imageChooser.removeEventListener('change', imageChooseHandler);
    imageDropZone.removeEventListener('dragenter', dragHandler);
    imageDropZone.removeEventListener('dragover', dragHandler);
    imageDropZone.removeEventListener('drop', imageDropHandler);
    formElement.removeEventListener('submit', submitChangeHandler);
  };
  window.export({
    renderAddress: renderAddress,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.form');
})();
