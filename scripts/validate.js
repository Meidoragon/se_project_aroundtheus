/**
 * Code for real time* form validity checking.
 * 
 * *Or at least as real time as is feasible. ie: every time the user makes a change to a form
 */


// const OPTIONS = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible"
// }

function showError (options, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass)
};

function hideError (options, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (options, formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideError(options, formElement, inputElement);
  } else {
    showError(options, formElement, inputElement, inputElement.validationMessage);
  }
};

function setEventListeners(options, formElement) {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(options, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(options, inputList, buttonElement);
      checkInputValidity(options, formElement, inputElement)
    });
  });
};

function enableValidation (options) {
  const formList = Array.from(DOM.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(options, formElement);
  })
};

function hasInvalidInput(inputList){
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

function toggleButtonState(options, inputList, buttonElement){
  if (hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  };
};

enableValidation(OPTIONS); 