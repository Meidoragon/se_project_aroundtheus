
/**
 * Open a popup and create event listeners related to closing said popup.
 * @param {HTMLElement} popup html element to open in a popup
 */
export function openPopup(popup){
  popup.classList.add('modal_opened');
  popup.addEventListener("mousedown", handleClick);
  document.addEventListener("keydown", handleKeypress);
}

function handleClick(evt) {
  const clickedElement = evt.target;
  if ((clickedElement.classList.contains('modal')) || clickedElement.classList.contains('modal__cancel-button')){
    closePopup(clickedElement.closest('.modal'))
  }
}

function handleKeypress(evt){
  if (evt.key === 'Escape'){
    const currentPopup = document.querySelector('.modal_opened');
    closePopup(currentPopup);
  }
}

function closePopup(popup){
  popup.classList.remove('modal_opened');
  document.removeEventListener("mousedown", handleClick);
  document.removeEventListener("keydown", handleKeypress);
}

//Event Listeners
// editButton.addEventListener('click', openProfileEditor);
// cardAddButton.addEventListener('click', () => openPopup(cardEditor));
// profileForm.addEventListener('submit', submitProfile);
// cardForm.addEventListener('submit', submitCard);
