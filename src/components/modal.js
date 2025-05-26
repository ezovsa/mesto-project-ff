

// Функции для работы с модальными окнами
// Открывает попап и навешивает слушатели Esc, overlay, крестик
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClick);
  const closeBtn = popup.querySelector('.popup__close');
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(popup));
}

// Закрывает попап и снимает слушатели
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('mousedown', handleOverlayClick);
}

// Обработчик Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closeModal(openPopup);
  }
}

// Обработчик клика по оверлею
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}