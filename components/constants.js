export const VALIDATOR_OPTIONS = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

export const UTIL_OPTIONS = {
  profileButtonSelector: '.profile__edit-button',
  addCardButtonSelector: '.profile__add-button',
  profileFormSelector: 'profile-form',
  addCardFormSelector: 'card-form'
}

export const DOM = document;

// const profileName = DOM.querySelector('.profile__name');
// const profileDescription = DOM.querySelector('.profile__description');
// const editButton = DOM.querySelector('.profile__edit-button');
// const cardAddButton = DOM.querySelector('.profile__add-button');
// const galleryCardList = DOM.querySelector('.gallery__cards');
// const cardTemplate = DOM.querySelector("#card_template").content.querySelector('.card');
// const cancelButtons = DOM.querySelectorAll('.modal__cancel-button');

// const profileEditor = DOM.querySelector('.profile-modal');
// const profileForm = DOM.forms['profile-form'];
// const editorName = profileForm.elements.name;
// const editorDescription = profileForm.elements.description;
// const editorCancelButton = profileForm.elements.profile_cancel_button;

// const cardEditor = DOM.querySelector('.card-modal');
// const cardForm = DOM.forms['card-form'];
// const cardName = cardForm.elements.name;
// const cardImageURL = cardForm.elements.url;
// const cardCancelButton = cardForm.elements.card_cancel_button;