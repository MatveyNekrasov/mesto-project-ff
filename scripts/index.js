const cardsListContainer = document.querySelector(".places__list");

function createCard(card, deleteButtonClickHandler) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteButtonClickHandler);

  return cardElement;
}

function deleteCard(evt) {
  const clickedCard = evt.target.closest(".card");
  clickedCard.remove();
}

initialCards.forEach((card) => {
  cardsListContainer.append(createCard(card, deleteCard));
});
