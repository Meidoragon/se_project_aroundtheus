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
  #card
  #buttonText
  #loadingButtonText

  /**
   * Object for managing a confirmation dialogue popup
   * @param {String} popupSelector selector for dialogue to manage
   * @param {Function} confirmAction action to take when confirmation is successful
   * @param {String} loadingButtonText text for submit button to show loading is in progress
   */
  constructor (popupSelector, confirmAction, loadingButtonText){
    super(popupSelector);
    this.#buttonElement = this.getPopupElement().querySelector('.modal__button')
    this.#confirmAction = confirmAction;
    this.#loadingButtonText = loadingButtonText;
    this.#buttonText = this.#buttonElement.textContent;
  }

  #handleButtonClick = () => {
    this.#confirmAction(this.#card)
  }

  /**
   * turn on changes to modal related to content loads
   */
  showLoading(){
    this.#buttonElement.textContent = this.#loadingButtonText; //TODO: unhardcode this
  }
  
  /**
   * turn off changes to modal related to content loads
   */
  hideLoading(){
    this.#buttonElement.textContent = this.#buttonText;
  }

  /**
   * Opens confirmation dialogue, and sets the target to card
   * @param {Object} card 
   */
  open(card){
    this.#card = card;
    super.open()
  }

  /**
   * Sets event listeners for popup
   */
  setEventListeners(){
    super.setEventListeners()
    this.#buttonElement.addEventListener('mousedown', this.#handleButtonClick);
  }
}