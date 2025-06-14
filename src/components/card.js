// Шаблон карточки ищем один раз
const cardTemplateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export function createCard(
  data,
  { onDelete, onLike, onImageClick, currentUserId }
) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  titleElement.textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;

  // Показываем корзину только на своих карточках
  if (!data.owner || data.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      onDelete(cardElement, data._id)
    );
  }

  likeButton.addEventListener("click", () => onLike(likeButton));
  imageElement.addEventListener("click", () => onImageClick(data));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleCardLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
