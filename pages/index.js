import Card from "../components/Card.js";
import { openPopup, closePopup } from '../utils/utils.js';
import { BUTTON_ELEMENTS as buttons, 
        FORM_ELEMENTS as forms, 
        MODAL_ELEMENTS as modals,
        OTHER_ELEMENTS as elements,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards } from '../utils/constants.js';


function hatchCards (cardData) {
  elements.galleryCardList.append(new Card(cardData, '#card_template').createCard());
}

cards.forEach((cardData) => {
  hatchCards(cardData);
})

function openProfileEditor(){
  fields.editorName.value = elements.profileName.textContent;
  fields.editorDescription.value = elements.profileDescription.textContent;
  openPopup(modals.profileEditor);
}

function submitProfile(evt){
  evt.preventDefault();
  elements.profileName.textContent = fields.editorName.value;
  elements.profileDescription.textContent = fields.editorDescription.value;
  closePopup(modals.profileEditor);
}

function submitCard(evt){
  //TODO: Define: the things that aren't defined
  //TODO: rewrite to utilize Card.js
  //TODO: this also uses things in VALIDATOR_OPTIONS. Resolve this.
  //wow this one is actually kind of a real piece of work
  evt.preventDefault();
  const newCard = new Card(evt.target.title.value, evt.target.url.value);
  const inputList = [...evt.target.querySelectorAll(OPTIONS.inputSelector)];
  const buttonElement = evt.target.querySelector(OPTIONS.submitButtonSelector);
  galleryCardList.prepend(newCard);
  evt.target.reset();
  closePopup(cardEditor);
  toggleButtonState(OPTIONS, inputList, buttonElement);
}

buttons.profileEditButton.addEventListener('click', openProfileEditor);
buttons.addCardButton.addEventListener('click', () => openPopup(modals.cardEditor));
forms.profileForm.addEventListener('submit', submitProfile);
forms.addCardForm.addEventListener('submit', submitCard);