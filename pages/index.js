import Card from "../components/Card.js";
import { INITIAL_CARDS as cards } from "../data/data.js";
(function (){
  const galleryCardList = document.querySelector('.gallery__cards');


  cards.forEach((cardData) => {
    const card = new Card(cardData, '#card_template');
    galleryCardList.append(card.createCard())
  })
})();