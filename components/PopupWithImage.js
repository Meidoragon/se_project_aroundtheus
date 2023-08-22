import { DOM } from '../utils/constants.js';
/**
 * Create the PopupWithImage class as a child class of Popup. 
 * This class has to change the parent open() method. 
 * In the open() method of the PopupWithImage class, 
 * you need to add an image to the popup and the 
 * corresponding image src attribute along with a caption for the image.
 */

import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  #popupImage
  #popupTitle

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImage = this.getPopupElement().querySelector('.modal__image');
    this.#popupTitle = this.getPopupElement().querySelector('.modal__image-title');
  }

  open({link, name}){
    this.#popupImage.src = link;
    this.#popupImage.alt = name;
    this.#popupTitle.textContent = name;
    super.open();
  }
}