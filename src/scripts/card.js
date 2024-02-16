import { openModal, closeModal } from "./modal.js";
import { deleteCard, putCardLike, deleteCardLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const deleteCardPopup = document.querySelector(".popup_type_delete");
const confirmCardDeleteButton = deleteCardPopup.querySelector(".popup__button");

export function createCard(
  card,
  userId,
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
  const likesCount = cardElement.querySelector(".card__likes-count");
  renderLikesCount(likesCount, card.likes.length);
  likeButton.addEventListener("click", (evt) => {
    likeButtonClickHandler(evt, card._id, likesCount);
  });

  if (card.likes.find((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      deleteButtonClickHandler(card._id, cardElement)
    );
  }

  return cardElement;
}

export function handleLikeButtonClick(evt, cardId, likesCountElement) {
  if (isCardLiked(evt.target)) {
    deleteCardLike(cardId).then((res) => {
      renderLikesCount(likesCountElement, res.likes.length);
      evt.target.classList.remove("card__like-button_is-active");
    });
  } else {
    putCardLike(cardId).then((res) => {
      renderLikesCount(likesCountElement, res.likes.length);
      evt.target.classList.add("card__like-button_is-active");
    });
  }
}

function isCardLiked(buttonElement) {
  if (buttonElement.classList.contains("card__like-button_is-active")) {
    return true;
  } else {
    return false;
  }
}

function renderLikesCount(likesCountElement, likesCount) {
  likesCountElement.textContent = likesCount;
}

export function handleDeleteButtonClick(cardId, cardElement) {
  openModal(deleteCardPopup);
  confirmCardDeleteButton.addEventListener("click", handleConfirmButtonClick);

  function handleConfirmButtonClick() {
    deleteCard(cardId)
      .then(() => {
        closeModal(deleteCardPopup);
        cardElement.remove();
        confirmCardDeleteButton.removeEventListener(
          "click",
          handleConfirmButtonClick
        );
      })
      .catch((err) => console.log(err));
  }
}
