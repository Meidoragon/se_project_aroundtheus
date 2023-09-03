/**
 * the Popup class opens and closes the popup window
 */

export default class Popup {
  #popupElement
  constructor (popupSelector) {
    this.#popupElement = document.querySelector(popupSelector);
  }

  /**
   * obtain element object for the element this object represents
   * @returns element object
   */
  getPopupElement = () => {
    return this.#popupElement;
  }

  #handleEscClose = (evt) => {
    if (evt.key === 'Escape'){
      this.close();      
    }
  }

  /**
   * Handle DOM-wide click events while popup is open to check if popup should close
   * @param {event} evt click event
   */
  handleClick = (evt) => {
    const clickedElement = evt.target;
    if ((clickedElement.classList.contains('modal')) || 
         clickedElement.classList.contains('modal__cancel-button')){
      this.close();
    }
  }

  /**
   * opens popup
   */
  open(){
    this.#popupElement.classList.add('modal_opened');
    document.addEventListener("keydown", this.#handleEscClose);
  }

  /**
   * closes popup
   */
  close() {
    this.#popupElement.classList.remove('modal_opened');
    document.removeEventListener("keydown", this.#handleEscClose);
  }

  /**
   * sets event listeners 
   */
  setEventListeners() {
    this.#popupElement.addEventListener("mousedown", this.handleClick);
  }
}