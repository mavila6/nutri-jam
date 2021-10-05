const { Schema } = require("mongoose");

// used in User Model array of savedFood
const foodSchema = new Schema({
  // do we need the description? Should I require?
  // saved food id from ??? API
  idMeal: {
    type: String,
    required: true,
  },
  // strMealThumb: {
  //   type: Image,
  //   // ??????
  // },
  strMeal: {
    type: String,
    required: true,
  },
  strIngredient1: {
    type: String,
  },
  strIngredient2: {
    type: String,
  },
  strIngredient3: {
    type: String,
  },
  strInstructions: {
    type: String,
  },
  // strYoutube: {
  //   type: [String],
  // },
});

module.exports = foodSchema;
