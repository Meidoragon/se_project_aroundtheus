import Popup from './Popup.js';
export default class PopupWithForm extends Popup{

  #formFieldset
  #form
  #formFields
  #formSubmit
/**
 * code for managing form popups
 * @param {string} popupSelector HTML element class name of modal to manage with this object
 * @param {function} handleFormSubmit
 */
  constructor (popupSelector, fields, handleFormSubmit){
    super(popupSelector);
    this.#formFieldset = this.getPopupElement().querySelector('.modal__form');
    this.#form = this.getPopupElement().querySelector('.modal__form-container');
    this.#formFields = fields;
    this.#formSubmit = handleFormSubmit;
  }

  /**
   * opens popup
   */
  open = () => {
    super.open(); 
  }

  //TODO: unhardcode this. somehow do it in a way that does not make me need to rewrite this a third time.
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
