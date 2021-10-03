const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import schema from Food.js
const foodSchema = require("./Food.js");

// userSchema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@\..+/, "Valid Email Address Required!"],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedFood to an array of data to foodSchema
    savedFood: [foodSchema],
  },
  // set to use virtual
  {
    toJSON: {
      virtual: true,
    },
  }
);

// user password hashed
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// method customized to compare and validate login credentials
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// added foodCount to track the number of saved items
userSchema.virtual("foodCount").get(function () {
  return this.savedFood.length;
});

const User = model("User", userSchema);

module.exports = User;
