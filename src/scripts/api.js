const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "37c27805-4486-40c8-98d8-f35c7d710efc",
    "Content-type": "application/json",
  },
};

function handleResponse(response, errorMessage) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`${errorMessage}: ${response.status}`);
}

export function getUserProfile() {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) =>
    handleResponse(
      res,
      "Произошла ошибка при запросе информации о пользователе:"
    )
  );
}

export function getCardList() {
  return fetch(`${apiConfig.baseURL}/cards`, {
    headers: apiConfig.headers,
  }).then((res) =>
    handleResponse(res, "Произошла ошибка при запросе списка карточек")
  );
}

export function patchUserProfile(profileData) {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(profileData),
  }).then((res) =>
    handleResponse(
      res,
      "Произошла ошибка при обновлении информации о пользователе"
    )
  );
}

/* Опциональная проверка, что юзер указал ссылку на картинку при выборе аватарки пока не реализована -
некоторые ресурсы блокируют запрос из-за настроек CORS, пока не придумал как это поправить*/

/* export function isImageURL(URL) {
  let isImage;
  return fetch(URL, {
    method: "HEAD",
  })
    .then((res) => {
      console.log(res);
      console.log(res.headers.get("Content-type"));
      isImage = res.headers.get("Content-type").includes("image");
      return Promise.resolve(isImage);
    })
    .catch((err) => console.log(err));
} */

export function patchUserAvatar(avatarURL) {
  return fetch(`${apiConfig.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  }).then((res) =>
    handleResponse(res, "Произошла ошибка при обновлении аватарки пользователя")
  );
}

export function postNewCard(card) {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(card),
  }).then((res) =>
    handleResponse(res, "Произошла ошибка при добавлении новой карточки")
  );
}

export function deleteCard(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) =>
    handleResponse(res, "Произошла ошибка при удалении карточки пользователя")
  );
}

export function putCardLike(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => handleResponse(res, "Произошла ошибка при лайке карточки"));
}

export function deleteCardLike(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) =>
    handleResponse(res, "Произошла ошибка при дизлайке карточки")
  );
}
