/**
 * TODO: Turn this into a generic confirmation dialogue,
 *  instead of being specifically for card deletion
 *  Instead of sending a function in at creation, 
 *  send it in during open(). Then it can be used for
 *  any sort of confirmation on the page.
 */

import Popup from './Popup.js';

export default class PopupConfirmation extends Popup{
  #buttonElement
  #confirmAction
  card

  constructor (popupSelector, confirmAction){
    super(popupSelector);
    this.#buttonElement = this.getPopupElement().querySelector('.modal__button')
    this.#confirmAction = confirmAction;
  }

  #handleButtonClick = () => {
    super.close();
    this.#confirmAction(this.card);
  }

  open(card){
    this.card = card;
    super.open()
  }

  setEventListeners(){
    super.setEventListeners()
    this.#buttonElement.addEventListener('mousedown', this.#handleButtonClick);
  }
}