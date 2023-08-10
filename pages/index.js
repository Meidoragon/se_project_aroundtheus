import Card from "../components/Card.js";
import { setEventListeners } from "../utils/utils.js";
import { INITIAL_CARDS as cards } from "../data/data.js";
import { DOM } from "../components/constants.js";

(function (){
  const galleryCardList = document.querySelector('.gallery__cards');



  setEventListeners();

  cards.forEach((cardData) => {
    const card = new Card(cardData, '#card_template');
    galleryCardList.append(card.createCard())
  })
})();