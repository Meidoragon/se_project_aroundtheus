import Popup from './Popup.js';

export default class PopupConfirmation extends Popup{
  #buttonElement
  #confirmAction
  #actionParams
  #buttonText
  #loadingButtonText

  /**
   * Object for managing a confirmation dialogue popup
   * @param {String} popupSelector selector for dialogue to manage
   * @param {Function} confirmAction action to take when confirmation is successful
   * @param {String} loadingButtonText text for submit button to show loading is in progress
   */
  constructor (popupSelector, action, loadingButtonText){
    super(popupSelector);
    this.#buttonElement = this.getPopupElement().querySelector('.modal__button')
    this.#loadingButtonText = loadingButtonText;
    this.#buttonText = this.#buttonElement.textContent;
  }

  #handleButtonClick = () => {
    this.#confirmAction(this.#actionParams)
  }

  /**
   * set the action to take when confirmation succeeds
   * @param {function} action function for action to take 
   * @param {object} actionParams optional object of parameters to pass to 'action'. Key names should match with parameter names in 'action'.
   */
  setAction(action, actionParams){
    this.#confirmAction = action;
    if(actionParams){
      this.#actionParams = actionParams;
    }
  }

  /**
   * turn on changes to modal related to content loads
   */
  showLoading(){
    this.#buttonElement.textContent = this.#loadingButtonText; 
  }
  
  /**
   * turn off changes to modal related to content loads
   */
  hideLoading(){
    this.#buttonElement.textContent = this.#buttonText;
  }

  /**
   * Sets event listeners for popup
   */
  setEventListeners(){
    super.setEventListeners()
    this.#buttonElement.addEventListener('mousedown', this.#handleButtonClick);
  }
}