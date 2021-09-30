const apiKey = "6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83";

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
  return fetch(`https://serpapi.com/search.json?q=${query}&hl=en&gl=us&api_key=${apiKey}`);
};
