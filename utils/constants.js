export const DOM = document;

export const VALIDATOR_OPTIONS = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

export const FORM_ELEMENTS = {
  profileForm: DOM.forms['profile-form'],
  addCardForm: DOM.forms['card-form']
}

export const MODAL_ELEMENTS = {
  cardEditor: DOM.querySelector('.card-modal'),
  profileEditor: DOM.querySelector('.profile-modal')
}

export const BUTTON_ELEMENTS = {
  profileEditButton:  DOM.querySelector('.profile__edit-button'),
  addCardButton: DOM.querySelector('.profile__add-button'),
}

export const FIELD_ELEMENTS = {
  editorName: FORM_ELEMENTS.profileForm.elements.name,
  editorDescription: FORM_ELEMENTS.profileForm.elements.description,
  cardName: FORM_ELEMENTS.addCardForm.elements.name,
  cardURL: FORM_ELEMENTS.addCardForm.elements.url
}


export const OTHER_ELEMENTS = {
  galleryCardList: DOM.querySelector('.gallery__cards'),
  profileName: DOM.querySelector('.profile__name'),
  profileDescription: DOM.querySelector('.profile__description')
}

export const INITIAL_CARDS = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg'
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg'
  },
];


//const galleryCardList = document.querySelector('.gallery__cards');



// const cardEditor = DOM.querySelector(opts.cardEditorSelector);

// const profileName = DOM.querySelector('.profile__name');
// const profileDescription = DOM.querySelector('.profile__description');
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