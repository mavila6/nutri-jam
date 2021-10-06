export const getSavedFoodIds = () => {
  const savedFoodIds = localStorage.getItem("saved_foods")
    ? JSON.parse(localStorage.getItem("saved_foods"))
    : [];

  return savedFoodIds;
};

export const saveFoodIds = (foodIdArr) => {
  if (foodIdArr.length) {
    localStorage.setItem("saved_foods", JSON.stringify(foodIdArr));
  } else {
    localStorage.removeItem("saved_foods");
  }
};

export const removeFoodId = (idMeal) => {
  const savedFoodIds = localStorage.getItem("saved_foods")
    ? JSON.parse(localStorage.getItem("saved_foods"))
    : null;

  if (!savedFoodIds) {
    return false;
  }

  const updatedSavedFoodIds = savedFoodIds?.filter(
    (savedFoodId) => savedFoodId !== idMeal);
  localStorage.setItem("saved_foods", JSON.stringify(updatedSavedFoodIds));

  return true;
};

