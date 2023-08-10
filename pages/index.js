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
  elems.galleryCardList.append(new Card(cardData, '#card_template').createCard());
}
cards.forEach((cardData) => {
  hatchCards(cardData);
})

//Form Validation
Array.from(DOM.querySelectorAll(VALIDATOR_OPTIONS.formSelector)).forEach((formElement) => {
  //attach the validator directly to the form fieldset
  formElement.formValidator = new FormValidator(VALIDATOR_OPTIONS, formElement);
  formElement.formValidator.enableValidation();
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
  hatchCards({link: evt.target.url.value, name: evt.target.title.value});
  closePopup(mods.cardEditor);
  evt.target.reset();
  evt.target.querySelector(".modal__form").formValidator.toggleButtonState();
}

//event listeners. 
buttons.profileEditButton.addEventListener('click', openProfileEditor);
buttons.addCardButton.addEventListener('click', () => openPopup(mods.cardEditor));
forms.profileForm.addEventListener('submit', submitProfile);
forms.addCardForm.addEventListener('submit', submitCard);