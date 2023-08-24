import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  #popupImage
  #popupTitle

  /**
   * image preview popup manager
   * @param {string} popupSelector  HTML element class name of popup to manage with this object
   */
  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImage = this.getPopupElement().querySelector('.modal__image');
    this.#popupTitle = this.getPopupElement().querySelector('.modal__image-title');
    console.log(this.#popupTitle);
  }

  /**
   * modifies information on popup, then open it
   * @param {object} param0 object containing link and name values to image to add to popup
   */
  open({link, title}){
    this.#popupImage.src = link;
    this.#popupImage.alt = title;
    this.#popupTitle.textContent = title;
    super.open();
  }
}