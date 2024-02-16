import "./pages/index.css";
import {
  createCard,
  handleLikeButtonClick,
  handleDeleteButtonClick,
} from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  getUserProfile,
  getCardList,
  patchUserProfile,
  postNewCard,
  patchUserAvatar,
  isImageURL,
} from "./scripts/api.js";

let currentUserId;

const cardsListContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAvatarEditPopup = document.querySelector(".popup_type_avatar");
const profileEditButton = document.querySelector(".profile__edit-button");

const cardAddPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPhoto = imagePopup.querySelector(".popup__image");
const imagePopupPhotoCaption = imagePopup.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileEditForm = document.forms["edit-profile"];
const profileEditNameInput = profileEditForm.elements.name;
const profileEditDescInput = profileEditForm.elements.description;

const profileAvatarEditForm = document.forms["edit-avatar"];
const profileAvatarLink = profileAvatarEditForm.elements.link;

const cardAddForm = document.forms["new-place"];
const newCardNameInput = cardAddForm.elements["place-name"];
const newCardLinkInput = cardAddForm.elements["link"];

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

function renderUserProfile(profileData) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
}

function renderCardList(cardList) {
  cardList.forEach((card) => {
    cardsListContainer.append(
      createCard(
        card,
        currentUserId,
        handleCardImageClick,
        handleLikeButtonClick,
        handleDeleteButtonClick
      )
    );
  });
}

function initApp(profileDataPromise, cardListPromise) {
  Promise.all([profileDataPromise, cardListPromise])
    .then(([profileData, cardList]) => {
      currentUserId = profileData._id;
      renderUserProfile(profileData);
      renderCardList(cardList);
    })
    .catch((err) => console.log(err));
}

function prepareProfileEditForm(title, description) {
  profileEditNameInput.value = title;
  profileEditDescInput.value = description;
  clearValidation(profileEditForm, validationConfig);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = profileEditForm.querySelector(".popup__button");
  const newProfileData = {
    name: profileEditNameInput.value,
    about: profileEditDescInput.value,
  };
  renderLoading(true, submitButtonElement);
  patchUserProfile(newProfileData)
    .then((res) => {
      renderUserProfile(res);
      closeModal(profileEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButtonElement));
}

function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement = cardAddForm.querySelector(".popup__button");
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };
  renderLoading(true, submitButtonElement);
  postNewCard(newCard)
    .then((res) => {
      cardsListContainer.prepend(
        createCard(
          res,
          currentUserId,
          handleCardImageClick,
          handleLikeButtonClick,
          handleDeleteButtonClick
        )
      );
      cardAddForm.reset();
      closeModal(cardAddPopup);
      cardAddForm
        .querySelector(validationConfig.submitButtonSelector)
        .classList.add(validationConfig.inactiveButtonClass);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButtonElement));
}

function handleAvatarChangeFormSubmit(evt) {
  evt.preventDefault();
  const submitButtonElement =
    profileAvatarEditForm.querySelector(".popup__button");
  renderLoading(true, submitButtonElement);
  patchUserAvatar(profileAvatarLink.value)
    .then((res) => {
      renderUserProfile(res);
      closeModal(profileAvatarEditPopup);
      profileAvatarEditForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButtonElement));
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

profileEditButton.addEventListener("click", () => {
  prepareProfileEditForm(
    profileTitle.textContent,
    profileDescription.textContent
  );
  openModal(profileEditPopup);
});

profileImage.addEventListener("click", () => openModal(profileAvatarEditPopup));
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
profileAvatarEditForm.addEventListener("submit", handleAvatarChangeFormSubmit);

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

const userProfile = getUserProfile();
const cardList = getCardList();
initApp(userProfile, cardList);
enableValidation(validationConfig);

/* isImageURL(
  "https://opis-cdn.tinkoffjournal.ru/mercury/is-gigachad-real-04.qiwcibt5l1en..jpg"
);*/
/* isImageURL(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpDhXyLGJUyWALd5KRgKy-jrrHMgp0IwIPqhBBcb6zQ&s"
).then((res) => console.log(res)); */
