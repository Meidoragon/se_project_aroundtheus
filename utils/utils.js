import { DOM } from '../utils/constants.js';

function handleClick(evt) {
  const clickedElement = evt.target;
  if ((clickedElement.classList.contains('modal')) || 
      clickedElement.classList.contains('modal__cancel-button')){
    closePopup(clickedElement.closest('.modal'))
  }
}

function handleKeypress(evt){
  if (evt.key === 'Escape'){
    const currentPopup = DOM.querySelector('.modal_opened');
    closePopup(currentPopup);
  }
}

/**
 * Close a popup and remove event listeners related to closing said popup.
 * @param {HTMLElement} popup html overlaid element to close
 */
export function closePopup(popup){
  popup.classList.remove('modal_opened');
  DOM.removeEventListener("mousedown", handleClick);
  DOM.removeEventListener("keydown", handleKeypress);
}

/**
 * Open a popup and create event listeners related to closing said popup.
 * @param {HTMLElement} popup html element to open in a popup
 */
export function openPopup(popup){
  popup.classList.add('modal_opened');
  popup.addEventListener("mousedown", handleClick);
  DOM.addEventListener("keydown", handleKeypress);
}
