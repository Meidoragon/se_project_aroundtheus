/*
TODO:
  Class Constructors that receive HTML elements:
    either find the element outside of the class and send that, 
    or send the selector and find it in the class.
    Pick one.
  When loading images, either on initial load, or after creating a new one
    perhaps utilize .onload and .onerror to stop showing the image loads?
*/
import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupConfirmation from '../components/PopupConfirmation';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from '../components/FormValidator.js';
import API from '../components/API.js';
import {BUTTON_ELEMENTS as buttons,
        FORM_SELECTORS as formSelectors,
        SELECTORS as selectors,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        VALIDATOR_OPTIONS as options,
        API_OPTIONS as apiOptions} from '../utils/constants.js';

//Initialize (most) classes

const imagePopup = new PopupWithImage(selectors.imageModal);
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm(selectors.profileEditor, submitProfile);
profileFormPopup.setEventListeners();

const cardFormPopup = new PopupWithForm(selectors.cardEditor, submitCard)
cardFormPopup.setEventListeners();

const confirmationPopup = new PopupConfirmation(selectors.confirmationModal)
confirmationPopup.setEventListeners();

//hold these variable names for me JS. Arigatou.
let gallery;
let user;

// const gallery = new Section(cards, renderCard, elems.galleryCardList)
// gallery.renderItems();

//Initialize validators
const formValidators = {};
const enableValidation = (options) => {
  const formList = [...document.querySelectorAll(options.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    validator.enableValidation();
    formValidators[formElement.getAttribute('id')] = validator;
  })
}
enableValidation(options);

//Functions to pass to class objects
function submitProfile (evt) {
  evt.preventDefault();
  user.setUserInfo(profileFormPopup.getInputValues());
  profileFormPopup.close();
}

function createCard(item){
  //ouroboros-chan...
  const handleCardClick = () => {
    imagePopup.open(card.getCardInfo());
  }

  const handleDeleteClick = () => {
    confirmationPopup.open(card.getCardId())
  }

  const card = new Card(item, handleCardClick, handleDeleteClick, selectors.cardTemplate);
  return card.createCard();
}

function submitCard(evt) {
  evt.preventDefault();
  api.addNewCard(cardFormPopup.getInputValues())
    .then((item) => {
      const card = createCard(item);
      gallery.prependItem(card);
    })
    .finally(() => {
      cardFormPopup.close();
    })
}

function renderCard(item) {
  const card = createCard(item);
  gallery.appendItem(card);
}

// function renderCard(item) {
//   const card = createCard(item);
//   gallery.appendItem(card);
// }

//Event listeners. 
buttons.profileEditButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  fields.editorName.value = info.username;
  fields.editorDescription.value = info.description;
  profileFormPopup.open();
  formValidators[formSelectors.profileFormSelector].resetValidation();
});
buttons.addCardButton.addEventListener('click', () => {
  cardFormPopup.open();
  formValidators[formSelectors.addCardFormSelector].resetValidation();
});

//Initialize API interactions
const api = new API(apiOptions)
Promise.all([api.getCardList(), api.getUserInfo()])
  .then(([cards, userInfo]) => {
    const elements = {nameElement: elems.profileName, descriptionElement: elems.profileDescription};
    user = new UserInfo(elements, userInfo, updateUserInfo);
    gallery = new Section(cards, renderCard, elems.galleryCardList);

    gallery.renderItems();
  });

function updateUserInfo(newName, newDescription) {
  return api.patchUserInfo(newName, newDescription);
}