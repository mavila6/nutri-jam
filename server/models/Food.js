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
  title: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  totalTime: {
    type: String,
  },
  ingredients: {
    type: [String],
  },
});

module.exports = foodSchema;
