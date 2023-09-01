import Popup from './Popup.js';

export default class PopupConfirmation extends Popup{
  #buttonElement
  constructor (popupSelector){
    super(popupSelector);
    this.#buttonElement = this.getPopupElement().querySelector('.modal__button')
  }

  #handleButtonClick(evt){
    //add actual functionality
    this.close();
  }

  setEventListeners(){
    super.setEventListeners()
    this.#buttonElement.addEventListener('mousedown', this.#handleButtonClick);
  }
}