// 1. DOM-узлы и шаблон
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector('form[name="new-place"]');
const placeNameInput = formNewCard.elements["place-name"];
const placeLinkInput = formNewCard.elements["link"];
const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
// 2. Открытие/закрытие
const openPopup = (popup) => popup.classList.add("popup_is-opened");
const closePopup = (popup) => popup.classList.remove("popup_is-opened");
//закрытие по крестику и сброс формы
document.querySelectorAll(".popup__close").forEach((btn) =>
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    closePopup(popup);
    const form = popup.querySelector("form");
    if (form) form.reset();
  })
);
//создания карточки
function createCard({ name, link }, handleDelete) {
  const cardEl = cardTemplate.cloneNode(true);
  const imgEl = cardEl.querySelector(".card__image");
  const titleEl = cardEl.querySelector(".card__title");
  const likeBtn = cardEl.querySelector(".card__like-button");
  const deleteBtn = cardEl.querySelector(".card__delete-button");
  imgEl.src = link;
  imgEl.alt = name;
  titleEl.textContent = name;
  deleteBtn.addEventListener("click", () => handleDelete(cardEl));

  // лайк
  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__like-button_is-active")
  );

  imgEl.addEventListener("click", () => {
    popupImageImg.src = link;
    popupImageImg.alt = name;
    popupImageCaption.textContent = name;
    openPopup(popupImage);
  });

  return cardEl;
}

function removeCard(cardEl) {
  cardEl.remove();
}

// 6 исходных карточек при загрузке
initialCards.forEach((data) => {
  placesList.append(createCard(data, removeCard));
});

profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  placesList.prepend(createCard(cardData, removeCard));
  closePopup(popupNewCard);
  formNewCard.reset();
});
