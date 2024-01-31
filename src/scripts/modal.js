export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
}

export function closePopupOnOverlayClick(evt) {
  const target = evt.target;
  const openedPopup = document.querySelector(".popup_is-opened");

  if (target.classList.contains("popup") && openedPopup) {
    closeModal(openedPopup);
  }
}

export function closePopupOnEscKeydown(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (evt.key === "Escape" && openedPopup) {
    closeModal(openedPopup);
  }
}
