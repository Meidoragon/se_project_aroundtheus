import { VALIDATOR_OPTIONS } from '../utils/constants.js';
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
export default class PopupWithForm extends Popup{
  #formFieldset
  #form
  #formFields
  #validator
  #formSubmit
  constructor (popupSelector, handleFormSubmit){
    super(popupSelector);
    this.#formFieldset = this.getPopupElement().querySelector('.modal__form');
    this.#form = this.getPopupElement().querySelector('.modal__form-container');
    this.#formFields = [...this.#formFieldset.querySelectorAll('.modal__input')];
    this.#formSubmit = handleFormSubmit.bind(this);
    this.#validator = new FormValidator(VALIDATOR_OPTIONS, this.#formFieldset);
    this.#validator.enableValidation();
  }

  open = () => {
    super.open(); 
    this.#validator.toggleButtonState();
  }

  getInputValues = () => {
    return [ this.#formFields[0].value, this.#formFields[1].value ];
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.getPopupElement().addEventListener('submit', this.#formSubmit);
  }

  resetForm = () => {
    this.#form.reset();
  }
}
