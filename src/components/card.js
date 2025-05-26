

// Шаблон карточки ищем один раз
const cardTemplateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");


  export function createCard(data, { onDelete, onLike, onImageClick }) {
    const { name, link } = data;
    const cardElement = cardTemplateElement.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const titleElement = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    titleElement.textContent = name;
    imageElement.src = link;
    imageElement.alt = name;

    deleteButton.addEventListener("click", () => onDelete(cardElement));
    likeButton.addEventListener("click", () => onLike(likeButton));
    imageElement.addEventListener("click", () => onImageClick({ name, link }));

    return cardElement;
  }


  export function deleteCard(cardElement) {
    cardElement.remove();
  }


  export function toggleCardLike(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
