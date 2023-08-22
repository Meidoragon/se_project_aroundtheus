
/**
 * Code for real time* form validity checking.
 * *or at least as real time as is feasible. ie: every time the user makes a change to a form
 */
export default class FormValidator{
  #inputSelector
  #submitButtonSelector
  #submitButton
  #inactiveButtonClass
  #inputErrorClass
  #errorClass
  #formElement
  #formInputList

  /**
   * Object to create and manage form validation event handlers.
   * @param {Object} options Object containing settings to use for validation
   * @param {Element} element element object for which to enable validation
   */
  constructor(options, element){
    this.#inputSelector = options.inputSelector;
    this.#submitButtonSelector = options.submitButtonSelector;
    this.#inactiveButtonClass = options.inactiveButtonClass;
    this.#inputErrorClass = options.inputErrorClass;
    this.#errorClass = options.errorClass;
    this.#formElement = element;
    this.#submitButton = this.#formElement.querySelector(this.#submitButtonSelector);
  }

  #showError (inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass)
  };

  #hideError (inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  };

  #checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this.#hideError(inputElement);
    } else {
      this.#showError(inputElement);
    }
  }

  #hasInvalidInput(){
    return this.#formInputList.some((input) => {
      return !input.validity.valid;
    });
  };
  
  /**
   * Check the current state of the form, and toggle button functionality accordingly.
   */
  toggleButtonState(){
    if (this.#hasInvalidInput()){
      this.#submitButton.disabled = true;
      this.#submitButton.classList.add(this.#inactiveButtonClass);
    } else {
      this.#submitButton.disabled = false;
      this.#submitButton.classList.remove(this.#inactiveButtonClass);
    };
  };

  /**
   * Enable validation of the fieldset object
   */
  enableValidation() {
    this.#formInputList = [...this.#formElement.querySelectorAll(this.#inputSelector)];
    this.toggleButtonState();
    this.#formInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this.toggleButtonState();
        this.#checkInputValidity(inputElement);
      });
    });
  };
}