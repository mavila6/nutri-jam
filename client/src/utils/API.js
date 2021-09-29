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
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userData)    
    })
}



export const removeFood = (foodData, token) => {
    return fetch(`/api/users/food/${foodId}`, {
        method: "DELETE", 
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

