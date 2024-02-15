const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "37c27805-4486-40c8-98d8-f35c7d710efc",
    "Content-type": "application/json",
  },
};

export const getUserProfile = () => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};
