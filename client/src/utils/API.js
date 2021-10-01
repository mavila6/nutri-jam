const apiKey = REACT_APP_API_KEY

export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const login = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const saveFood = (savedFoodInput, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": `Bearer ${token}`,
    },
    body: JSON.stringify(savedFoodInput),
  });
};

export const removeFood = (foodId, token) => {
  return fetch(`/api/users/food/${foodId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const searchFood = (query) => {
  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch(apiKey);

  const params = {
    q: { query },
    location: "United States",
    hl: "en",
    gl: "us",
  };

  const callback = function (data) {
    return data["recipes_results"];
  };

  // Show result!
  const searchResult = search.json(params, callback);
  return searchResult;
};
