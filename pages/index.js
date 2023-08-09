import Card from "../components/Card.js";
(function (){
  const initialCards = [
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
  ]
  const galleryCardList = document.querySelector('.gallery__cards');


  initialCards.forEach((cardData) => {
    const card = new Card(cardData, '#card_template');
    galleryCardList.append(card.createCard())
  })
})();