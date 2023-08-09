(function (){
  //Event Listeners
  editButton.addEventListener('click', openProfileEditor);
  cardAddButton.addEventListener('click', () => openPopup(cardEditor));
  profileForm.addEventListener('submit', submitProfile);
  cardForm.addEventListener('submit', submitCard);
})()