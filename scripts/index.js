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
const editors =  DOM.querySelectorAll('.modal');
const profileEditor = editors[0];
const cardEditor = editors[1];
const profileForm = DOM.forms['profile-form'];
const editorName = profileForm.elements.name;
const editorDescription = profileForm.elements.description;
const editorCancelButton = profileForm.elements.cancel_button;

const cardForm = DOM.forms['card-form'];
const cardName = cardForm.elements.name;
const cardImageURL = cardForm.elements.url;
const cardCancelButton = cardForm.elements.cancel_button;
const galleryCardList = DOM.querySelector('.gallery__cards');
const cardTemplate = DOM.querySelector("#card_template").content.querySelector('.card');

//Functions
/**
 * Toggles the display state of the profile editor window
 */
function toggleProfileEditor(){
  editorName.value = profileName.textContent;
  editorDescription.value = profileDescription.textContent;
  profileEditor.classList.toggle('modal_opened');
}
/**
 * Toggles the display state of the card editor window
 */
function toggleCardEditor(){
  cardEditor.classList.toggle('modal_opened');
}

/**
 * Submits changes made in profile editor and closes the window
 * @param {event} evt Event that triggered this function
 */
function submitProfile(evt){
  evt.preventDefault();
  profileName.textContent = editorName.value;
  profileDescription.textContent = editorDescription.value;
  profileEditor.classList.toggle('modal_opened');
}

function submitCard(evt){
  evt.preventDefault();
  const newCard = getCardElement(evt.target.title.value, evt.target.url.value);
  galleryCardList.prepend(newCard);
  evt.target.reset();
  cardEditor.classList.toggle('modal_opened');
}

/**
 * Generates a card to add to the ul element in the gallery section
 * @param {string} name string of the information to add to the title of the card
 * @param {string} link string of the url for the image to add to the card 
 * @returns object representing html element to be added to card section
 */
function getCardElement(name, link){
  const cardElement = cardTemplate.cloneNode(true);
  const img = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__button_type_like-inactive');
  const deleteButton = cardElement.querySelector('.card__button_type_delete');
  const handleLikeClick = (evt) => {
    evt.target.classList.toggle('card__button_type_like-active');
  }
  const handleDeleteClick = () => {
    cardElement.remove()
  }
  const handleImageClick = () => {
    console.log('click')
  }
  img.src = link;
  img.alt = name;
  title.textContent = name;
  likeButton.addEventListener('click', handleLikeClick);
  deleteButton.addEventListener('click', handleDeleteClick);
  img.addEventListener('click', handleImageClick);
  return cardElement;
}

function handleLikeClick(evt){
  evt.target.classList.toggle('card__button_type_like-active');
}

//Event Listeners
editButton.addEventListener('click', toggleProfileEditor);
cardAddButton.addEventListener('click', toggleCardEditor);
editorCancelButton.addEventListener('click', toggleProfileEditor);
cardCancelButton.addEventListener('click', toggleCardEditor);
profileForm.addEventListener('submit', submitProfile);
cardForm.addEventListener('submit', submitCard);



//Render loop
initialCards.forEach((card) => {
  galleryCardList.append(getCardElement(card.name, card.link));
})
