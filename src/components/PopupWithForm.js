import Popup from './Popup.js';
export default class PopupWithForm extends Popup{

  #form
  #formFields
  #formSubmit
  #submitButton
  #loadingButtonText
  #buttonText
/**
 * code for managing form popups
 * @param {string} popupSelector HTML element class name of modal to manage with this object
 * @param {function} handleFormSubmit
 */
  constructor (popupSelector, handleFormSubmit, submitButton, loadingButtonText){
    super(popupSelector);
    this.#form = this.getPopupElement().querySelector('.modal__form-container');
    this.#formFields = this.#getFields();
    this.#formSubmit = handleFormSubmit;
    this.#submitButton = submitButton;
    this.#buttonText = this.#submitButton.textContent;
    this.#loadingButtonText = loadingButtonText;
  }

  #getFields(){
    const retObj = {};
    this.#form.querySelectorAll('.modal__input').forEach((item) => {
      retObj[item.id] = item;
    })
    return retObj;
  }

  /**
   * turn on changes to modal related to content loads
   */
  showLoading(){
    this.#submitButton.textContent = this.#loadingButtonText;
  }
  
  /**
   * turn off changes to modal related to content loads
   */
  hideLoading(){
    this.#submitButton.textContent = this.#buttonText;
  }

  /**
   * @returns values in the form inputs
   */
  getInputValues = () => {
    const retObj = {}
    Object.keys(this.#formFields).forEach((key) => {
      retObj[key] = this.#formFields[key].value;
    })
    return retObj;
  }

  /**
   * set event listeners for this popup
   */
  setEventListeners = () => {
    super.setEventListeners();
    this.getPopupElement().addEventListener('submit', this.#formSubmit);
  }

  /**
   * resets form
   */
  close () {
    super.close();
    this.#form.reset();
  }
}
