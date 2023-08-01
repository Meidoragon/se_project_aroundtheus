const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg'
  },
]

//Declarations
const DOM = document;
const profileName = DOM.querySelector('.profile__name');
const profileDescription = DOM.querySelector('.profile__description');
const editButton = DOM.querySelector('.profile__edit-button');
const cardAddButton = DOM.querySelector('.profile__add-button');
const galleryCardList = DOM.querySelector('.gallery__cards');
const cardTemplate = DOM.querySelector("#card_template").content.querySelector('.card');
const cancelButtons = DOM.querySelectorAll('.modal__cancel-button');

const profileEditor = DOM.querySelector('.profile-modal');
const profileForm = DOM.forms['profile-form'];
const editorName = profileForm.elements.name;
const editorDescription = profileForm.elements.description;
const editorCancelButton = profileForm.elements.profile_cancel_button;

const cardEditor = DOM.querySelector('.card-modal');
const cardForm = DOM.forms['card-form'];
const cardName = cardForm.elements.name;
const cardImageURL = cardForm.elements.url;
const cardCancelButton = cardForm.elements.card_cancel_button;

const imagePreview = DOM.querySelector('.preview-modal');
const previewImage = imagePreview.querySelector('.modal__image');
const previewTitle = imagePreview.querySelector('.modal__image-title');
const previewCancelButton = imagePreview.querySelector('.modal__cancel-button');

//Functions
/**
 * Toggles the display state of the profile editor window
 */
function openProfileEditor(){
  editorName.value = profileName.textContent;
  editorDescription.value = profileDescription.textContent;
  openPopup(profileEditor);
}

function displayImagePreview(title, image){
  previewImage.src = image;
  previewImage.alt = title;
  previewTitle.textContent = title;
  openPopup(imagePreview);
}

function openPopup(popup){
  popup.classList.add('modal_opened');
  popup.addEventListener("click", handleClick);
  DOM.addEventListener("keydown", handleKeypress);
}

function handleClick(evt) {
  const clickedElement = evt.target;
  if ((clickedElement.classList.contains('modal')) || clickedElement.classList.contains('modal__cancel-button')){
    closePopup(clickedElement.closest('.modal'))
  }
}

function handleKeypress(evt){
  if (evt.key === 'Escape'){
    const currentPopup = DOM.querySelector('.modal_opened');
    closePopup(currentPopup);
  }
}

function closePopup(popup){
  popup.classList.remove('modal_opened');
  DOM.removeEventListener("click", handleClick);
  DOM.removeEventListener("keydown", handleKeypress);
}

/**
 * Submits changes made in profile editor and closes the window
 * @param {event} evt Event that triggered this function
 */
function submitProfile(evt){
  evt.preventDefault();
  profileName.textContent = editorName.value;
  profileDescription.textContent = editorDescription.value;
  closePopup(profileEditor);
}

/**
 * Submits information entered in card creation form and closes the window
 * @param {event} evt Event that triggered this function
 */
function submitCard(evt){
  evt.preventDefault();
  const newCard = createCardElement(evt.target.title.value, evt.target.url.value);
  galleryCardList.prepend(newCard);
  evt.target.reset();
  closePopup(cardEditor);
}

/**
 * Generates a card to add to the ul element in the gallery section
 * @param {string} name string of the information to add to the title of the card
 * @param {string} link string of the url for the image to add to the card 
 * @returns object representing html element to be added to card section
 */
function createCardElement(name, link){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__button_type_like-inactive');
  const deleteButton = cardElement.querySelector('.card__button_type_delete');
  const handleLikeClick = (evt) => {
    evt.target.classList.toggle('card__button_type_like-active');
  }
  const handleDeleteClick = () => {
    cardElement.remove()
  }
  const handleImageClick = () => {
    displayImagePreview(name, link)
  }
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeButton.addEventListener('click', handleLikeClick);
  deleteButton.addEventListener('click', handleDeleteClick);
  cardImage.addEventListener('click', handleImageClick);
  return cardElement;
}

//Event Listeners
editButton.addEventListener('click', openProfileEditor);
cardAddButton.addEventListener('click', () => openPopup(cardEditor));
profileForm.addEventListener('submit', submitProfile);
cardForm.addEventListener('submit', submitCard);


//Render loop
initialCards.forEach((card) => {
  galleryCardList.append(createCardElement(card.name, card.link));
})

test()
const test = function() {
console.log('hello');
}