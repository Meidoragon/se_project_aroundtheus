import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { openPopup, closePopup } from '../utils/utils.js';
import { DOM,
        BUTTON_ELEMENTS as buttons, 
        FORM_ELEMENTS as forms, 
        MODAL_SELECTORS as mods,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards } from '../utils/constants.js';

const profileFormPopup = new PopupWithForm(mods.profileEditor, submitProfile);
profileFormPopup.setEventListeners();
const cardFormPopup = new PopupWithForm(mods.cardEditor, submitCard)
cardFormPopup.setEventListeners();
const user = new UserInfo(elems.profileName, elems.profileDescription);


//Card Generation
function hatchCards (cardData) {
  return new Card(cardData, '#card_template').createCard();
}
cards.forEach((cardData) => {
  elems.galleryCardList.append(hatchCards(cardData));
})

function submitProfile (evt) {
  evt.preventDefault();
  user.setUserInfo(profileFormPopup.getInputValues());
  this.close();
}

//TODO: this
function submitCard(evt) {
  evt.preventDefault();
  this.close();
  this.resetForm();
}


//Form Validation
// const validators = {};
// Array.from(DOM.querySelectorAll(VALIDATOR_OPTIONS.formSelector)).forEach((formElement) => {
//   //become able to refer to a specific validator via parent element ID.
//   validators[formElement.parentElement.id] = new FormValidator(VALIDATOR_OPTIONS, formElement);
//   validators[formElement.parentElement.id].enableValidation();
// });

//Modal overlay management
// function openProfileEditor(){
//   fields.editorName.value = elems.profileName.textContent;
//   fields.editorDescription.value = elems.profileDescription.textContent;
//   openPopup(mods.profileEditor);
// }

// function submitProfile(evt){
//   evt.preventDefault();
//   elems.profileName.textContent = fields.editorName.value;
//   elems.profileDescription.textContent = fields.editorDescription.value;
//   closePopup(mods.profileEditor);
// }

// function submitCard(evt){
//   evt.preventDefault();
//   elems.galleryCardList.prepend(hatchCards({link: evt.target.url.value, name: evt.target.title.value}));
//   closePopup(mods.cardEditor);
//   evt.target.reset();
//   validators[evt.target.id].toggleButtonState();
// }

//event listeners. 
buttons.profileEditButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  fields.editorName.value = info.name;
  fields.editorDescription.value = info.description;
  profileFormPopup.open();
});
buttons.addCardButton.addEventListener('click', () => {
  cardFormPopup.open();
});
// forms.profileForm.addEventListener('submit', );
// forms.addCardForm.addEventListener('submit', submitCard);
