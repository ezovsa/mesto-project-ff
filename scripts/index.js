const placesList = document.querySelector(".places__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const addBtn = document.querySelector(".profile__add-button");
const formNew = document.querySelector(
  '.popup_type_new-card form[name="new-place"]'
);
const imagePopup = document.querySelector(".popup_type_image");
const openPopup = (popup) => popup.classList.add("popup_is-opened");
const closePopup = (popup) => popup.classList.remove("popup_is-opened");

document.querySelectorAll(".popup__close").forEach((btn) =>
  btn.addEventListener("click", () => {
    const popup = btn.closest(".popup");
    popup.querySelector("form")?.reset();
    closePopup(popup);
  })
);

addBtn.addEventListener("click", () => openPopup(formNew.closest(".popup")));

const createCard = ({ name, link }) => {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector(".card__image");
  const like = card.querySelector(".card__like-button");

  img.src = link;
  img.alt = name;
  card.querySelector(".card__title").textContent = name;

  // удаление
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", () => card.remove());

  // лайк
  like.addEventListener("click", () =>
    like.classList.toggle("card__like-button_is-active")
  );

  img.addEventListener("click", () => {
    const imgPopupEl = imagePopup.querySelector(".popup__image");
    const cap = imagePopup.querySelector(".popup__caption");
    imgPopupEl.src = link;
    imgPopupEl.alt = name;
    cap.textContent = name;
    openPopup(imagePopup);
  });

  return card;
};

initialCards.forEach((data) => placesList.append(createCard(data)));

formNew.addEventListener("submit", (e) => {
  e.preventDefault();
  const { "place-name": name, link } = formNew.elements;
  placesList.prepend(createCard({ name: name.value, link: link.value }));
  formNew.reset();
  closePopup(formNew.closest(".popup"));
});
