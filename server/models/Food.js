const { Schema } = require("mongoose");

// used in User Model array of savedFood
const foodSchema = new Schema({
  // do we need the description? Should I require?
  // saved food id from ??? API
  foodId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  
});

module.exports = foodSchema;
