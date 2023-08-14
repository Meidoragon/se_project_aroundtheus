import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopup, closePopup } from '../utils/utils.js';
import { DOM,
        VALIDATOR_OPTIONS,
        BUTTON_ELEMENTS as buttons, 
        FORM_ELEMENTS as forms, 
        MODAL_ELEMENTS as mods,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards } from '../utils/constants.js';

//Card Generation
function hatchCards (cardData) {
  return new Card(cardData, '#card_template').createCard();
}
cards.forEach((cardData) => {
  elems.galleryCardList.append(hatchCards(cardData));
})

//Form Validation
const validators = {};
Array.from(DOM.querySelectorAll(VALIDATOR_OPTIONS.formSelector)).forEach((formElement) => {
  //become able to refer to a specific validator via parent element ID.
  validators[formElement.parentElement.id] = new FormValidator(VALIDATOR_OPTIONS, formElement);
  validators[formElement.parentElement.id].enableValidation();
});

//Modal overlay management
function openProfileEditor(){
  fields.editorName.value = elems.profileName.textContent;
  fields.editorDescription.value = elems.profileDescription.textContent;
  openPopup(mods.profileEditor);
}

function submitProfile(evt){
  evt.preventDefault();
  elems.profileName.textContent = fields.editorName.value;
  elems.profileDescription.textContent = fields.editorDescription.value;
  closePopup(mods.profileEditor);
}

function submitCard(evt){
  evt.preventDefault();
  elems.galleryCardList.prepend(hatchCards({link: evt.target.url.value, name: evt.target.title.value}));
  closePopup(mods.cardEditor);
  evt.target.reset();
  validators[evt.target.id].toggleButtonState();
}

//event listeners. 
buttons.profileEditButton.addEventListener('click', openProfileEditor);
buttons.addCardButton.addEventListener('click', () => openPopup(mods.cardEditor));
forms.profileForm.addEventListener('submit', submitProfile);
forms.addCardForm.addEventListener('submit', submitCard);