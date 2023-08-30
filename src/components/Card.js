export default class Card{
  #title;
  #link;
  #cardInfo
  #cardSelector;
  #cardElement;
  #likeButton;
  #deleteButton;
  #cardImage;
  #handleImageClick

  /**
   * Code for creating new cards from a template and an object containing the text and image url
   * @param {Object} data {link, name} two element object containing the .text and image .link with which to make the card
   * @param {Element} cardSelector the template element that gets used to build the card element
   */
  constructor({link, name}, clickHandler, cardSelector){
    this.#title = name;
    this.#link = link;
    this.#cardInfo = {title: this.#title, link: this.#link};
    this.#handleImageClick = clickHandler;
    this.#cardSelector = cardSelector;
  }

  #handleLikeClick = () => {
    this.#likeButton.classList.toggle('card__button_type_like-active');
  }

  #handleDeleteClick = () => {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  #setEventListeners = () => {
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

  /**
   * obtain object with card info
   * @returns object with the name of and url to the relevant image
   */
  getCardInfo(){
    return this.#cardInfo;
  }

  /**
   * Creates and returns the entire card element, ready to be displayed.
   * @returns the card element to be added to the card grid
   */
  createCard = () => {
    this.#cardElement = document
      .querySelector(this.#cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    const cardImage = this.#cardElement.querySelector('.card__image');
    const cardTitle = this.#cardElement.querySelector('.card__title');

    cardImage.src = this.#link;
    cardImage.alt = this.#title;
    cardTitle.textContent = this.#title;

    this.#setEventListeners();

    return this.#cardElement
  }
}