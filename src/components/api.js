import { createRequest } from "../scripts/utils/request.js";

const baseUrl = "https://mesto.nomoreparties.co/v1/wff-cohort-41";
const request = createRequest(baseUrl);

class Api {
  constructor({ headers }) {
    this._headers = headers;
  }

  // Получение информации о пользователе
  getUserInfo() {
    return request("/users/me", {
      headers: this._headers,
    });
  }

  // Получение карточек с сервера
  getInitialCards() {
    return request("/cards", {
      headers: this._headers,
    });
  }

  // Обновление информации о пользователе
  updateUserInfo({ name, about }) {
    return request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  // Добавление новой карточки
  addCard({ name, link }) {
    return request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  // Удаление карточки
  deleteCard(cardId) {
    return request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Поставить лайк
  likeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Убрать лайк
  unlikeCard(cardId) {
    return request(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Обновление аватара пользователя
  updateAvatar({ avatar }) {
    return request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }
}

// Создаем экземпляр класса Api
const api = new Api({
  headers: {
    authorization: "499581f2-9984-4a05-8470-2f138e2e5dee",
    "Content-Type": "application/json",
  },
});

export default api;
