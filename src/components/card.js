// Функция для работы с карточками
export function createCard({ name, link }, { onDelete, onLike, onImageClick }) {
  const template = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardEl = template.cloneNode(true);
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
