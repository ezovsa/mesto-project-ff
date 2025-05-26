

// Шаблон карточки ищем один раз
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");


export function createCard({ name, link }, { onDelete, onLike, onImageClick }) {
  const cardEl = cardTemplate.cloneNode(true);
  const img = cardEl.querySelector(".card__image");
  const title = cardEl.querySelector(".card__title");
  const likeBtn = cardEl.querySelector(".card__like-button");
  const deleteBtn = cardEl.querySelector(".card__delete-button");

  title.textContent = name;
  img.src = link;
  img.alt = name;

  deleteBtn.addEventListener("click", () => onDelete(cardEl));
  likeBtn.addEventListener("click", () => onLike(likeBtn));
  img.addEventListener("click", () => onImageClick({ name, link }));

  return cardEl;
}


export function removeCard(cardEl) {
  cardEl.remove();
}


export function toggleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}
