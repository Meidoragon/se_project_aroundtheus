/*
TODO:
  Class Constructors that receive HTML elements:
    either find the element outside of the class and send that, 
    or send the selector and find it in the class.
    Pick one.
  When loading images, either on initial load, or after creating a new one
    perhaps utilize .onload and .onerror to stop showing the image loads?
  Error handler? Check for GET or POST failure, then depending on status, recur until a certain time limit is reached.
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

const avatarFormPopup = new PopupWithForm(selectors.avatarModal, submitAvatar);
avatarFormPopup.setEventListeners();

const cardDeletionConfirmation = new PopupConfirmation(selectors.confirmationModal, confirmDeletion)
cardDeletionConfirmation.setEventListeners();

/**
 * these need to be named synchroniously so that they can be referenced before async code runs,
 * yet still be instantiated in the async block.
 * feels eerily similar to writing vba...
 * 'dim gallery as object'
 * www
 */
let gallery;
let user;

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

function renderCard(item) {
  const card = createCard(item);
  gallery.appendItem(card);
}

function createCard(item){
  const handleCardClick = () => {
    imagePopup.open(card.getCardInfo());
  }
  const handleDeleteClick = () => {
    cardDeletionConfirmation.open(card)
  }
  const handleLikeClick = (isLiked) => {
    return isLiked? 
      api.removeCardLike(card.getCardId()):
      api.addCardLike(card.getCardId());
  }

  const functions = {
    handleImageClick: handleCardClick,
    confirmDeletion: handleDeleteClick,
    sendLikeInfo: handleLikeClick}

  const card = new Card(item, functions, selectors.cardTemplate);
  return card.createCard();
}

//
function updateUserInfo(newName, newDescription) {
  return api.patchUserInfo(newName, newDescription);
}

// console.log(buttons.confirmationButton.textContent);
// console.log(buttons.cardSubmitButton.textContent);
// console.log(buttons.profileSubmitButton.textContent);
// console.log(buttons.avatarSubmitButton.textContent);

function submitAvatar (evt) {
  evt.preventDefault();
  buttons.avatarSubmitButton.textContent = 'Saving...';
  api.updateAvatar(avatarFormPopup.getInputValues())
    .then((result) => {
      user.updateAvatar(result.avatar);
    })
    .catch((result) => {
      console.error(`Error: ${result.status}`);
    })
    .finally(() => {
      avatarFormPopup.close();
      buttons.avatarSubmitButton.textContent = 'Save';
    })
  
}

function confirmDeletion(card){
  api.deleteCard(card.getCardId());
  card.getCardElement().remove();
  card = null;
}

function submitCard(evt) {
  evt.preventDefault();
  api.addNewCard(cardFormPopup.getInputValues())
    .then((item) => {
      const card = createCard(item);
      gallery.prependItem(card);
    })
    .catch((response) => {
      console.log(response);
    })
    .finally(() => {
      cardFormPopup.close();
    })
}

//Event listeners. 
buttons.profileEditButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  fields.editorName.value = info.username;
  fields.editorDescription.value = info.description;
  formValidators[formSelectors.profileFormSelector].resetValidation();
  profileFormPopup.open();
});
buttons.addCardButton.addEventListener('click', () => {
  formValidators[formSelectors.addCardFormSelector].resetValidation();
  cardFormPopup.open();
});
buttons.avatarEditButton.addEventListener('click', () => {
  formValidators[formSelectors.avatarEditFormSelector].resetValidation();
  avatarFormPopup.open();
});

//Initialize API interactions
const api = new API(apiOptions)
Promise.all([api.getCardList(), api.getUserInfo()])
  .then(([cards, userInfo]) => {
    const elements = {
      nameElement: elems.profileName, 
      descriptionElement: elems.profileDescription,
      avatarElement: elems.profileAvatar};
    user = new UserInfo(elements, userInfo, updateUserInfo);
    gallery = new Section(cards, renderCard, elems.galleryCardList);

    gallery.renderItems();
  });

