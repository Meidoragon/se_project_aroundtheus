export const DOM = document;

export const API_OPTIONS = {
  baseURL: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: '855bc2dc-d7e9-4b86-b39d-0756d927d932',
    'Content-Type': 'application/json'
  }
}

export const VALIDATOR_OPTIONS = {
  formSelector: ".modal__form-container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

export const FORM_SELECTORS = {
  profileFormSelector: 'profile-form',
  addCardFormSelector: 'card-form',
  avatarEditFormSelector: 'avatar-form'
}

export const FORM_ELEMENTS = {
  profileForm: DOM.forms[FORM_SELECTORS.profileFormSelector],
  addCardForm: DOM.forms[FORM_SELECTORS.addCardFormSelector]
}

export const SELECTORS = {
  cardEditor: '.card-modal',
  profileEditor: '.profile-modal',
  imageModal: '.preview-modal',
  confirmationModal: '.confirmation-modal',
  avatarModal: '.update-avatar-modal',
  cardTemplate: '#card_template',
}

export const PROFILE_FIELDS = {
  name: FORM_ELEMENTS.profileForm.querySelector('.name-input'),
  description: FORM_ELEMENTS.profileForm.querySelector('.description-input')
}

export const CARD_FIELDS = {
  name: FORM_ELEMENTS.addCardForm.querySelector('.title-input'),
  link: FORM_ELEMENTS.addCardForm.querySelector('.link-input')
}

export const BUTTON_ELEMENTS = {
  profileEditButton:  DOM.querySelector('.profile__edit-button'),
  addCardButton: DOM.querySelector('.profile__add-button'),
  avatarEditButton: DOM.querySelector('.profile__avatar-overlay'),
  profileSubmitButton: DOM.getElementById('profile-submit-button'),
  cardSubmitButton: DOM.getElementById('card-submit-button'),
  avatarSubmitButton: DOM.getElementById('avatar-submit-button'),
  confirmationButton: DOM.getElementById('confirmation-button')
}

export const FIELD_ELEMENTS = {
  editorName: FORM_ELEMENTS.profileForm.elements.username,
  editorDescription: FORM_ELEMENTS.profileForm.elements.description,
  cardName: FORM_ELEMENTS.addCardForm.elements.name,
  cardURL: FORM_ELEMENTS.addCardForm.elements.url
}

export const OTHER_ELEMENTS = {
  galleryCardList: DOM.querySelector('.gallery__cards'),
  profileName: DOM.querySelector('.profile__name'),
  profileDescription: DOM.querySelector('.profile__description'),
  profileAvatar: DOM.querySelector('.profile__avatar')
}
