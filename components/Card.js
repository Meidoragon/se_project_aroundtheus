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

  #setEventListeners(){
    this.#likeButton = this.#cardElement.querySelector('.card__button_type_like-inactive');
    this.#deleteButton = this.#cardElement.querySelector('.card__button_type_delete');

    this.#likeButton.addEventListener('click', () => {
      this.#handleLikeClick();
    });
    this.#deleteButton.addEventListener('click', () => {
      this.#handleDeleteClick();
    });
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