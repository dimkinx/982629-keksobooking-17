'use strict';

(function () {
  var types = window.import('*').from('types');
  var MainPinSize = window.import('MainPinSize').from('types');
  var dom = window.import('unsetDisabled', 'setDisabled').from('util.dom');
  var getMainPinPosition = window.import('getMainPinPosition').from('ui.mainPin');

  var formElement = document.querySelector('.ad-form');
  var fieldSets = formElement.querySelectorAll('fieldset');
  var addressInput = formElement.querySelector('#address');
  var typeSelect = formElement.querySelector('#type');
  var priceInput = formElement.querySelector('#price');
  var timeInSelect = formElement.querySelector('#timein');
  var timeOutSelect = formElement.querySelector('#timeout');
  var roomNumberSelect = formElement.querySelector('#room_number');
  var capacitySelect = formElement.querySelector('#capacity');

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

  var activate = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldSets.forEach(dom.unsetDisabled);

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT));

    typeSelect.addEventListener('input', priceInputChangeHandler);
    timeInSelect.addEventListener('input', timeOutSelectChangeHandler);
    timeOutSelect.addEventListener('input', timeInSelectChangeHandler);
    roomNumberSelect.addEventListener('input', roomNumberChangeHandler);
    capacitySelect.addEventListener('input', capacityChangeHandler);
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
  };

  window.export({
    renderAddress: renderAddress,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.ad');
})();
