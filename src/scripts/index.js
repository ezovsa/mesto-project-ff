import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, toggleCardLike } from "../components/card.js";

// === DOM-элементы ===
// Редактирование профиля
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(
  'form[name="edit-profile"]'
);
const inputName = formEditProfile.elements["name"];
const inputJob = formEditProfile.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Добавление карточки
const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const formAddCard = popupAddCard.querySelector('form[name="new-place"]');

// Просмотр изображения
const popupImage = document.querySelector(".popup_type_image");
const popupImageEl = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// Контейнер карточек
const cardsContainer = document.querySelector(".places__list");

// Закрытие
document.querySelectorAll(".popup__close").forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

// Обработчик формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(popupEditProfile);
}

// Обработчик формы новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = formAddCard.elements["place-name"].value;
  const link = formAddCard.elements["link"].value;
  const card = createCard(
    { name, link },
    {
      onDelete: removeCard,
      onLike: toggleLike,
      onImageClick: ({ name, link }) => {
        popupImageEl.src = link;
        popupImageEl.alt = name;
        popupCaption.textContent = name;
        openModal(popupImage);
      },
    }
  );
  cardsContainer.prepend(card);
  formAddCard.reset();
  closeModal(popupAddCard);
}

// Стартовые карточки
initialCards.forEach((data) => {
  const card = createCard(data, {
    onDelete: deleteCard,
    onLike: toggleCardLike,
    onImageClick: ({ name, link }) => {
      popupImageEl.src = link;
      popupImageEl.alt = name;
      popupCaption.textContent = name;
      openModal(popupImage);
    },
  });
  cardsContainer.append(card);
});

// Редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openModal(popupEditProfile);
});

// Обработчик профиля
formEditProfile.addEventListener("submit", handleProfileSubmit);

// Открытие попапа добавления карточки
buttonAddCard.addEventListener("click", () => openModal(popupAddCard));

// Обработчик новой карточки
formAddCard.addEventListener("submit", handleAddCardSubmit);
