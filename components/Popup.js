import { DOM } from '../utils/constants.js';

/**
 * the Popup class opens and closes the popup window
 */

export default class Popup {
  #popupElement
  constructor (popupSelector) {
    this.#popupElement = document.querySelector(popupSelector);
  }

  getPopupElement = () => {
    return this.#popupElement;
  }

  #handleEscClose = (evt) => {
    if (evt.key === 'Escape'){
      this.close();      
    }
  }

  #handleClick = (evt) => {
    const clickedElement = evt.target;
    if ((clickedElement.classList.contains('modal')) || 
         clickedElement.classList.contains('modal__cancel-button')){
      this.close();
    }
  }

  open = () => {
    this.#popupElement.classList.add('modal_opened');
    this.setEventListeners();
  }

  close = () => {
    this.#popupElement.classList.remove('modal_opened');
    this.#popupElement.removeEventListener("mousedown", this.#handleClick);
    DOM.removeEventListener("keydown", this.#handleEscClose);
  }

  setEventListeners() {
    this.#popupElement.addEventListener("mousedown", this.#handleClick);
    DOM.addEventListener("keydown", this.#handleEscClose);
  }
}