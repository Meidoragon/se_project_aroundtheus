/*
TODO:
  Class Constructors that receive HTML elements:
    either find the element outside of the class and send that, 
    or send the selector and find it in the class.
    Pick one.
*/
import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from '../components/FormValidator';
import {BUTTON_ELEMENTS as buttons,
        PROFILE_FIELDS as profileInputs,
        CARD_FIELDS as cardInputs,
        SELECTORS as selectors,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards,
        VALIDATOR_OPTIONS as options } from '../utils/constants.js';


//Initialize classes
const user = new UserInfo(elems.profileName, elems.profileDescription);

const imagePopup = new PopupWithImage(selectors.imageModal);
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm(selectors.profileEditor, profileInputs, submitProfile);
profileFormPopup.setEventListeners();

const cardFormPopup = new PopupWithForm(selectors.cardEditor, cardInputs, submitCard)
cardFormPopup.setEventListeners();

const gallery = new Section(cards, renderCard, elems.galleryCardList)
gallery.renderItems();

const profileValidator = new FormValidator(options, document.querySelector('.profile-form')); //TODO: unhardcode this
const cardValidator = new FormValidator(options, document.querySelector('.card-form'));
profileValidator.enableValidation();
cardValidator.enableValidation();

//Functions to pass to class objects
function submitProfile (evt) {
  evt.preventDefault();
  console.log(profileFormPopup.getInputValues());
  user.setUserInfo(profileFormPopup.getInputValues());
  profileFormPopup.close();
}

function createCard(item){
  //ouroboros-chan...
  const handleCardClick = () => {
    imagePopup.open(card.getCardInfo());
  }
  const card = new Card(item, handleCardClick, selectors.cardTemplate);
  return card.createCard();
}

function submitCard(evt) {
  evt.preventDefault();
  const item = cardFormPopup.getInputValues();
  const card = createCard(item);
  gallery.prependItem(card);
  cardFormPopup.close();
  cardValidator.resetValidation();
}

function renderCard(item) {
  const card = createCard(item);
  gallery.appendItem(card);
}

//Event listeners. 
buttons.profileEditButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  fields.editorName.value = info.name;
  fields.editorDescription.value = info.description;
  profileFormPopup.open();
  profileValidator.resetValidation();
});
buttons.addCardButton.addEventListener('click', () => {
  cardFormPopup.open();
  cardValidator.resetValidation();
});
