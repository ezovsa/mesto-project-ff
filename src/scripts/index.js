import "../pages/index.css";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, toggleCardLike } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import api from "../components/api.js";

// Настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
  const name = inputName.value;
  const about = inputJob.value;

  api
    .updateUserInfo({ name, about })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    });
}

// Добавление карточки
buttonAddCard.addEventListener("click", () => {
  clearValidation(formAddCard, validationConfig);
  openModal(popupAddCard);
});

// Обработчик формы новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = formAddCard.elements["place-name"].value;
  const link = formAddCard.elements["link"].value;

  api
    .addCard({ name, link })
    .then((cardData) => {
      const card = createCard(cardData, {
        onDelete: deleteCard,
        onLike: toggleCardLike,
        onImageClick: ({ name, link }) => {
          popupImageEl.src = link;
          popupImageEl.alt = name;
          popupCaption.textContent = name;
          openModal(popupImage);
        },
      });
      cardsContainer.prepend(card);
      formAddCard.reset();
      clearValidation(formAddCard, validationConfig);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    });
}

let currentUserId = null;
let cardToDelete = null;

// Загрузка данных пользователя и карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;

    cards.forEach((cardData) => {
      const card = createCard(cardData, {
        onDelete: (cardElement, cardId) => {
          cardToDelete = { cardElement, cardId };
          openModal(popupDeleteCard);
        },
        onLike: toggleCardLike,
        onImageClick: ({ name, link }) => {
          popupImageEl.src = link;
          popupImageEl.alt = name;
          popupCaption.textContent = name;
          openModal(popupImage);
        },
        currentUserId,
      });
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  });

// Редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

// Обработчик профиля
formEditProfile.addEventListener("submit", handleProfileSubmit);

// Обработчик новой карточки
formAddCard.addEventListener("submit", handleAddCardSubmit);

// Включаем валидацию форм
enableValidation(validationConfig);

// Попап подтверждения удаления карточки
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const confirmDeleteButton = popupDeleteCard?.querySelector(".popup__button");

if (confirmDeleteButton) {
  confirmDeleteButton.addEventListener("click", () => {
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete.cardId)
        .then(() => {
          cardToDelete.cardElement.remove();
          closeModal(popupDeleteCard);
          cardToDelete = null;
        })
        .catch((err) => {
          console.log(`Ошибка при удалении карточки: ${err}`);
        });
    }
  });
}
