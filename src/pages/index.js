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

// buttons.profileSubmitButton.textContent = 'Saving...'
const profileFormPopup = new PopupWithForm(
  selectors.profileEditor,
  submitProfile,
  buttons.profileSubmitButton,
  'Saving...');
profileFormPopup.setEventListeners();

// buttons.cardSubmitButton.textContent = 'Saving...';
const cardFormPopup = new PopupWithForm(
  selectors.cardEditor,
  submitCard,
  buttons.cardSubmitButton,
  'Saving...')
cardFormPopup.setEventListeners();

// buttons.avatarSubmitButton.textContent = 'Saving...';
const avatarFormPopup = new PopupWithForm(
  selectors.avatarModal,
  submitAvatar,
  buttons.avatarSubmitButton,
  'Saving...');
avatarFormPopup.setEventListeners();

// buttons.confirmationButton.textContent = 'Deleting...'
const cardDeletionConfirmation = new PopupConfirmation(selectors.confirmationModal, confirmDeletion, 'Deleting...')
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
  

  //TODO: look into finding a way to do this with one call to .getInputValues()
  const param = {
    name: profileFormPopup.getInputValues().username,
    about: profileFormPopup.getInputValues().description
  };
  profileFormPopup.showLoading();
  api.patchUserInfo(param)
    .then((response) => {
      user.setUserInfo(response)
    })
    .catch((response) => {
      api.catchErrors(response);
    })
    .finally(() => {
      profileFormPopup.close();
      profileFormPopup.hideLoading();
    })
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
    if (isLiked) {
      api.removeCardLike(card.getCardId())
        .then(response => card.setIsLiked(response.isLiked))
        .catch(response => api.catchErrors(response));
    } else {
      api.addCardLike(card.getCardId())
        .then(response => card.setIsLiked(response.isLiked))
        .catch(response => api.catchErrors(response));
    }
  }

  const functions = {
    handleImageClick: handleCardClick,
    confirmDeletion: handleDeleteClick,
    handleLikeClick: handleLikeClick}

  const card = new Card(item, functions, selectors.cardTemplate);
  return card.createCard();
}

function submitAvatar (evt) {
  evt.preventDefault();
  avatarFormPopup.showLoading();
  api.updateAvatar(avatarFormPopup.getInputValues())
    .then((result) => {
      user.updateAvatar(result.avatar);
    })
    .catch((result) => {
      api.catchErrors(result);
    })
    .finally(() => {
      avatarFormPopup.hideLoading();
      avatarFormPopup.close();
    })
  
}

function confirmDeletion(card){
  cardDeletionConfirmation.showLoading();
  api.deleteCard(card.getCardId())
    .then((response) => {
      card.getCardElement().remove();
      card = null;
      cardDeletionConfirmation.close();
    })
    .catch((response) => {
      api.catchErrors(response)
    })
    .finally(() => {
      cardDeletionConfirmation.hideLoading();
    })
}

function submitCard(evt) {
  evt.preventDefault();
  cardFormPopup.showLoading();
  api.addNewCard(cardFormPopup.getInputValues())
    .then((item) => {
      const card = createCard(item);
      gallery.prependItem(card);
    })
    .catch((response) => {
      console.error(response);
    })
    .finally(() => {
      cardFormPopup.hideLoading();
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
    user = new UserInfo(elements, userInfo);
    gallery = new Section(cards, renderCard, elems.galleryCardList);

    gallery.renderItems();
  })
  .catch((response) => {
    api.catchErrors(response);
  });

