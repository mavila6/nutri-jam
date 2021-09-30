const { Schema } = require("mongoose");

// used in User Model array of savedFood
const foodSchema = new Schema({
  // do we need the description? Should I require?
  description: {
    type: String,
    required: true,
  },
  // saved food id from ??? API
  foodId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = foodSchema;
