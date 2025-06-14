class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Получение информации о пользователе
  getUserInfo() {
    console.log("Запрос данных пользователя...");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      console.log("Ответ сервера (пользователь):", res.status);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // Получение карточек с сервера
  getInitialCards() {
    console.log("Запрос карточек...");
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      console.log("Ответ сервера (карточки):", res.status);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

// Создаем экземпляр класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "499581f2-9984-4a05-8470-2f138e2e5dee",
    "Content-Type": "application/json",
  },
});

export default api;
