import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";

const cardsListContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteButtonClickHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    deleteButtonClickHandler(cardElement)
  );

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((card) => {
  cardsListContainer.append(createCard(card, deleteCard));
});
