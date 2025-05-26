import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard } from "../components/card.js";

// DOM
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = popupEdit.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.elements["name"];
const jobInput = formEdit.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const addBtn = document.querySelector(".profile__add-button");
const popupNew = document.querySelector(".popup_type_new-card");
const formNew = popupNew.querySelector('form[name="new-place"]');

const popupImage = document.querySelector(".popup_type_image");
const popupImg = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");

// Common handlers
function handleDelete(cardEl) {
  cardEl.remove();
}

function handleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

function handleImageClick({ name, link }) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

// Render initial cards
initialCards.forEach((data) => {
  const card = createCard(data, {
    onDelete: handleDelete,
    onLike: handleLike,
    onImageClick: handleImageClick,
  });
  placesList.append(card);
});

// Edit Profile
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
});

// Add new card
addBtn.addEventListener("click", () => openModal(popupNew));

formNew.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formNew.elements["place-name"].value,
    link: formNew.elements["link"].value,
  };
  const card = createCard(cardData, {
    onDelete: handleDelete,
    onLike: handleLike,
    onImageClick: handleImageClick,
  });
  placesList.prepend(card);
  formNew.reset();
  closeModal(popupNew);
});
