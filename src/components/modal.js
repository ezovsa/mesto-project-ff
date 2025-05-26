// Функции для работы с модальными окнами

// Открывает попап и навешивает слушатели Esc, overlay, крестик
export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscapeKey);
  popupElement.addEventListener("mousedown", onOverlayClick);
}

// Закрывает попап и снимает слушатели
export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscapeKey);
  popupElement.removeEventListener("mousedown", onOverlayClick);
}

// Обработчик Esc
function onEscapeKey(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) closeModal(activePopup);
  }
}

// Обработчик клика по оверлею
function onOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}