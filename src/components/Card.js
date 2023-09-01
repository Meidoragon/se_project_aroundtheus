export default class Card{
  #name;
  #link;
  #isLiked
  #cardId
  #cardInfo
  #cardSelector;
  #cardElement;
  #likeButton;
  #deleteButton;
  #cardImage;
  #handleImageClick
  #confirmDeletion
  #sendLikeInfo
 
  

  /**
   * Code for creating new cards from a template and an object containing the text and image url
   * @param {Object} item {link, name, _id} object containing the .text and image .link with which to make the card as well as the ._id of the card on the server
   * @param {Element} cardSelector the template element that gets used to build the card element
   */
  constructor(item, {handleImageClick, confirmDeletion, sendLikeInfo}, cardSelector){
    this.#name = item.name;
    this.#link = item.link;
    this.#isLiked = item.isLiked;
    this.#cardId = item._id;
    this.#cardInfo = {title: this.#name, link: this.#link};
    this.#handleImageClick = handleImageClick;
    this.#confirmDeletion = confirmDeletion;
    this.#sendLikeInfo = sendLikeInfo;
    this.#cardSelector = cardSelector;

    this.#cardElement = document
    .querySelector(this.#cardSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    this.#likeButton = this.#cardElement.querySelector('.card__button_type_like-inactive');
    this.#deleteButton = this.#cardElement.querySelector('.card__button_type_delete');
    this.#cardImage = this.#cardElement.querySelector('.card__image');
  }

  #handleLikeClick = () => {
    this.#sendLikeInfo(this.#isLiked);
    this.#likeButton.classList.toggle('card__button_type_like-active');
  }

  #handleDeleteClick = () => {
    this.#confirmDeletion();
  }

  #setEventListeners = () => {
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

  getCardId(){
    return this.#cardId;
  }

  getCardElement(){
    return this.#cardElement;
  }

  /**
   * Creates and returns the entire card element, ready to be displayed.
   * @returns the card element to be added to the card grid
   */
  createCard = () => {
    if (this.#isLiked) {
      this.#likeButton.classList.add('card__button_type_like-active');
    }
    const cardImage = this.#cardElement.querySelector('.card__image');
    const cardTitle = this.#cardElement.querySelector('.card__title');

    cardImage.src = this.#link;
    cardImage.alt = this.#name;
    cardTitle.textContent = this.#name;

    this.#setEventListeners();

    return this.#cardElement
  }
}