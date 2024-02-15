import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, likeCard, deleteCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import { getUserProfile } from "./scripts/api.js";

const cardsListContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

const cardAddPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPhoto = imagePopup.querySelector(".popup__image");
const imagePopupPhotoCaption = imagePopup.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = document.forms["edit-profile"];
const profileEditNameInput = profileEditForm.elements.name;
const profileEditDescInput = profileEditForm.elements.description;

const cardAddForm = document.forms["new-place"];
const newCardNameInput = cardAddForm.elements["place-name"];
const newCardLinkInput = cardAddForm.elements["link"];

function prepareProfileEditForm(title, description) {
  profileEditNameInput.value = title;
  profileEditDescInput.value = description;
  clearValidation(profileEditForm, validationConfig);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditDescInput.value;
  closeModal(profileEditPopup);
}

function handleCardImageClick(evt) {
  const target = evt.target;
  const card = target.closest(".card");
  const cardTitle = card.querySelector(".card__title");
  openModal(imagePopup);
  imagePopupPhoto.src = target.src;
  imagePopupPhoto.alt = target.alt;
  imagePopupPhotoCaption.textContent = cardTitle.textContent;
}

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };
  cardsListContainer.prepend(
    createCard(newCard, handleCardImageClick, likeCard, deleteCard)
  );
  cardAddForm.reset();
  cardAddForm
    .querySelector(validationConfig.submitButtonSelector)
    .classList.add(validationConfig.inactiveButtonClass);
  closeModal(cardAddPopup);
}

profileEditButton.addEventListener("click", () => {
  prepareProfileEditForm(
    profileTitle.textContent,
    profileDescription.textContent
  );
  openModal(profileEditPopup);
});
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

cardAddButton.addEventListener("click", () => openModal(cardAddPopup));
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((card) => {
  cardsListContainer.append(
    createCard(card, handleCardImageClick, likeCard, deleteCard)
  );
});

enableValidation(validationConfig);

const user = getUserProfile();
console.log(user);
