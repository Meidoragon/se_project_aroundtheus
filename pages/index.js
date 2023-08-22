import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {BUTTON_ELEMENTS as buttons, 
        FORM_ELEMENTS as forms, 
        SELECTORS as selectors,
        OTHER_ELEMENTS as elems,
        FIELD_ELEMENTS as fields,
        INITIAL_CARDS as cards } from '../utils/constants.js';

const profileFormPopup = new PopupWithForm(selectors.profileEditor, submitProfile);
profileFormPopup.setEventListeners();
const cardFormPopup = new PopupWithForm(selectors.cardEditor, submitCard)
cardFormPopup.setEventListeners();
const user = new UserInfo(elems.profileName, elems.profileDescription);
const gallery = new Section({items: cards, renderer: renderCard}, elems.galleryCardList)
gallery.renderItems();
const imagePopup = new PopupWithImage(selectors.previewModal);

function submitProfile (evt) {
  evt.preventDefault();
  user.setUserInfo(profileFormPopup.getInputValues());
  this.close();
}

function submitCard(evt) {
  evt.preventDefault();
  const formInfo = cardFormPopup.getInputValues();
  const item = {name: formInfo[0], link: formInfo[1]};
  const newCard = new Card(item, selectors.cardTemplate);
  gallery.addItem(newCard.createCard());
  this.close();
  this.resetForm();
}

function renderCard(item) {
  const card = new Card(item, selectors.cardTemplate);
  this.setItem(card.createCard());
}

//event listeners. 
buttons.profileEditButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  fields.editorName.value = info.name;
  fields.editorDescription.value = info.description;
  profileFormPopup.open(user.getUserInfo());
});
buttons.addCardButton.addEventListener('click', () => {
  cardFormPopup.open();
});
