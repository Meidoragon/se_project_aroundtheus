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
import FormValidator from '../components/FormValidator.js';
import API from '../components/API.js';
import {BUTTON_ELEMENTS as buttons,
        FORM_SELECTORS as formSelectors,
        SELECTORS as selectors,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards,
        VALIDATOR_OPTIONS as options,
        API_OPTIONS as apiOptions, 
        INITIAL_CARDS} from '../utils/constants.js';


//Initialize (most) classes
const user = new UserInfo(elems.profileName, elems.profileDescription);

const imagePopup = new PopupWithImage(selectors.imageModal);
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm(selectors.profileEditor, submitProfile);
profileFormPopup.setEventListeners();

const cardFormPopup = new PopupWithForm(selectors.cardEditor, submitCard)
cardFormPopup.setEventListeners();

const gallery = new Section(cards, renderCard, elems.galleryCardList)
gallery.renderItems();

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

//Initialize API
const api = new API(apiOptions)

/**
 * TODO: Fix this
 * Adding a card returns status 400, but getting the user information works fine.
 * API is saying 'name' and 'link' are empty, but the payloads clearly show that it isn't true.
 * Is it something to do with my headers?
 */
api.addNewCard(INITIAL_CARDS[0]);
api.getUserID();


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
  const card = new Card(item, handleCardClick, selectors.cardTemplate);
  return card.createCard();
}

function submitCard(evt) {
  evt.preventDefault();
  const item = cardFormPopup.getInputValues();
  const card = createCard(item);
  gallery.prependItem(card);
  cardFormPopup.close();
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
  formValidators[formSelectors.profileFormSelector].resetValidation();
});
buttons.addCardButton.addEventListener('click', () => {
  cardFormPopup.open();
  formValidators[formSelectors.addCardFormSelector].resetValidation();
});
