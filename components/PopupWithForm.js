import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor (popupSelector, formSubmit){
    super(popupSelector);
    this.#formSubmit = formSubmit;
  }

  #getInputValues() {
    const thing = {};
    return thing;
  }
}