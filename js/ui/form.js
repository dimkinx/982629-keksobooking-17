'use strict';

(function () {
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

  var resetChangeHandler = function () {
    formElement.reset();
    domRef.filterFormElement.reset();

    resetMainPin(changePinHandler);
    priceInput.placeholder = '1000';

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

  var activate = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldSets.forEach(dom.unsetDisabled);

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT));

    typeSelect.addEventListener('input', priceInputChangeHandler);
    timeInSelect.addEventListener('input', timeOutSelectChangeHandler);
    timeOutSelect.addEventListener('input', timeInSelectChangeHandler);
    roomNumberSelect.addEventListener('input', roomNumberChangeHandler);
    capacitySelect.addEventListener('input', capacityChangeHandler);
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

    typeSelect.removeEventListener('input', priceInputChangeHandler);
    timeInSelect.removeEventListener('input', timeOutSelectChangeHandler);
    timeOutSelect.removeEventListener('input', timeInSelectChangeHandler);
    roomNumberSelect.removeEventListener('input', roomNumberChangeHandler);
    capacitySelect.removeEventListener('input', capacityChangeHandler);
    formElement.removeEventListener('submit', submitChangeHandler);
  };

  window.export({
    renderAddress: renderAddress,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.form');
})();
