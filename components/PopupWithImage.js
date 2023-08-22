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
  #imageUrl
  constructor(imageUrl, popupSelector) {
    super(popupSelector);
    this.#imageUrl = imageUrl;
  }

  open(){
    super.open();
    //add functionality necessary for image popups
  }

  close(){
    super.close();
  }

  setEventListeners(){
    super.getPopupElement.addEventListener("mousedown", this.handleClick);
    DOM.addEventListener("keydown", super.handleEscClose);
  }
}