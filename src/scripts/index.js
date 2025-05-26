import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, removeCard, toggleLike } from "../components/card.js";

// === DOM-элементы ===
// Редактирование профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector('form[name="edit-profile"]');
const profileNameInput = profileForm.elements["name"];
const profileJobInput = profileForm.elements["description"];
const profileNameLabel = document.querySelector(".profile__title");
const profileJobLabel = document.querySelector(".profile__description");

// Добавление карточки
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector('form[name="new-place"]');

// Просмотр изображения
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Контейнер карточек
const cardsContainer = document.querySelector(".places__list");

// Закрытие 
document.querySelectorAll(".popup__close").forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

// Обработчик формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameLabel.textContent = profileNameInput.value;
  profileJobLabel.textContent = profileJobInput.value;
  closeModal(profilePopup);
}

// Обработчик формы новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardForm.elements["place-name"].value;
  const link = newCardForm.elements["link"].value;
  const card = createCard(
    { name, link },
    {
      onDelete: removeCard,
      onLike: toggleLike,
      onImageClick: ({ name, link }) => {
        imagePopupImage.src = link;
        imagePopupImage.alt = name;
        imagePopupCaption.textContent = name;
        openModal(imagePopup);
      },
    }
  );
  cardsContainer.prepend(card);
  newCardForm.reset();
  closeModal(newCardPopup);
}


// Стартовые карточки
initialCards.forEach((data) => {
  const card = createCard(data, {
    onDelete: removeCard,
    onLike: toggleLike,
    onImageClick: ({ name, link }) => {
      imagePopupImage.src = link;
      imagePopupImage.alt = name;
      imagePopupCaption.textContent = name;
      openModal(imagePopup);
    },
  });
  cardsContainer.append(card);
});

// Редактирования профиля
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileNameLabel.textContent;
  profileJobInput.value = profileJobLabel.textContent;
  openModal(profilePopup);
});

// Обработчик профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Открытие попапа добавления карточки
addCardButton.addEventListener("click", () => openModal(newCardPopup));

// Обработчик новой карточки
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
