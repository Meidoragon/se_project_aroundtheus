import { UTIL_OPTIONS as opts, DOM } from '../components/constants.js';


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
  DOM.removeEventListener("mousedown", handleClick);
  DOM.removeEventListener("keydown", handleKeypress);
}

function openProfileEditor(){
  //TODO: Define: editorName, profileName, editorDescription, profileDescription, profileEditor
  editorName.value = profileName.textContent;
  editorDescription.value = profileDescription.textContent;
  openPopup(profileEditor);
}

function submitProfile(evt){
  //TODO: Define: the things that aren't defined
  evt.preventDefault();
  profileName.textContent = editorName.value;
  profileDescription.textContent = editorDescription.value;
  closePopup(profileEditor);
}

function submitCard(evt){
  //TODO: Define: the things that aren't defined
  //TODO: rewrite to utilize Card.js
  //TODO: this also uses things in VALIDATOR_OPTIONS. Resolve this.
  //wow this one is actually kind of a real piece of work
  evt.preventDefault();
  const newCard = createCardElement(evt.target.title.value, evt.target.url.value);
  const inputList = [...evt.target.querySelectorAll(OPTIONS.inputSelector)];
  const buttonElement = evt.target.querySelector(OPTIONS.submitButtonSelector);
  galleryCardList.prepend(newCard);
  evt.target.reset();
  closePopup(cardEditor);
  toggleButtonState(OPTIONS, inputList, buttonElement);
}

/**
 * Open a popup and create event listeners related to closing said popup.
 * @param {HTMLElement} popup html element to open in a popup
 */
export function openPopup(popup){
  popup.classList.add('modal_opened');
  popup.addEventListener("mousedown", handleClick);
  DOM.addEventListener("keydown", handleKeypress);
}

/**
 * Set DOM-wide and one-time event listeners
 */
export function setEventListeners(){
  const profileEditButton = DOM.querySelector(opts.profileButtonSelector);
  const cardAddButton = DOM.querySelector(opts.addCardButtonSelector);
  const profileForm = DOM.forms[opts.profileFormSelector];
  const cardForm = DOM.forms[opts.addCardFormSelector];

  profileEditButton.addEventListener('click', openProfileEditor);
  //TODO: Define: cardEditor
  cardAddButton.addEventListener('click', () => openPopup(cardEditor));
  profileForm.addEventListener('submit', submitProfile);
  cardForm.addEventListener('submit', submitCard);
}