/**
 *  TODO: continue refactor. #displayImagePreview and its related logic needs to be set up. Figure out which
 *    parts should be in the class, and which need to be in utils.js
 */
/*********************************************************************************************************/

import { openPopup } from '../utils/utils.js';

/**
 * Code for creating new cards from a template and an object containing the text and image url
 */
export default class Card{
  #name;
  #link;
  #cardSelector;
  #cardElement;
  #likeButton;
  #deleteButton;
  #cardImage;
  #imagePreview;

  /**
   * 
   * @param {Object} data two element object containing the .text and image .link with which to make the card
   * @param {Element} template the template element that gets used to build the card element
   */
  constructor({link, name}, cardSelector){
    this.#name = name;
    this.#link = link;
    this.#cardSelector = cardSelector;

  }

  #handleLikeClick () {
    this.#likeButton.classList.toggle('card__button_type_like-active');
  }

  #handleDeleteClick () {
    this.#cardElement.remove();
  }

  #handleImageClick () {
    //TODO: these three are getting called every time an image gets clicked. 
    //consider sending these to constants or something
    const imagePreview = document.querySelector('.preview-modal');
    const previewImage = imagePreview.querySelector('.modal__image');
    const previewTitle = imagePreview.querySelector('.modal__image-title');

    previewImage.src = this.#link;
    previewImage.alt = this.#name;
    previewTitle.textContent = this.#name;
    openPopup(imagePreview);
  }

  #setEventListeners(){
    this.#likeButton = this.#cardElement.querySelector('.card__button_type_like-inactive');
    this.#deleteButton = this.#cardElement.querySelector('.card__button_type_delete');
    this.#cardImage = this.#cardElement.querySelector('.card__image');

    this.#likeButton.addEventListener('mousedown', () => {
      this.#handleLikeClick();
    });
    this.#deleteButton.addEventListener('mousedown', () => {
      this.#handleDeleteClick();
    });
    this.#cardImage.addEventListener('mousedown', () => {
      this.#handleImageClick();
    })
  }

  createCard(){
    /**
     * create card
     * add listeners
     * return the card
     */
    this.#cardElement = document
      .querySelector(this.#cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    const cardImage = this.#cardElement.querySelector('.card__image');
    const cardTitle = this.#cardElement.querySelector('.card__title');

    cardImage.src = this.#link;
    cardImage.alt = this.#name;
    cardTitle.textContent = this.#name;

    this.#setEventListeners();

    return this.#cardElement
  }
}