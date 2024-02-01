const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  card,
  imageClickHandler,
  likeButtonClickHandler,
  deleteButtonClickHandler
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;
  cardImage.addEventListener("click", imageClickHandler);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    likeButtonClickHandler(likeButton)
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    deleteButtonClickHandler(cardElement)
  );

  return cardElement;
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(card) {
  card.remove();
}
