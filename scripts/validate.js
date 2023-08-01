const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const formElement = DOM.querySelector(options.formSelector);
const formInput = formElement.querySelector(options.inputSelector);
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass)
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = () => {
  if (formInput.validity.valid) {
    hideError(formElement, formInput);
  } else {
    showError(formElement, formInput, formInput.validationMessage);
  }
};

formInput.addEventListener("input", (evt) => {
  checkInputValidity();
});


const enableValidation = (options) => {
  
};

enableValidation(options); 