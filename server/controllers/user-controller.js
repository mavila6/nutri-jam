// import models
const { User } = require("../models");
// import sign user
const { signToken } = require("../utils/auth");

module.exports = {
  // get a single user
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });
    if (!foundUser) {
      return res.status(400).json({ message: "No User with ID!" });
    }

    res.json(foundUser);
  },
  // create a user
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Error. Try Again!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login user
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res
        .status(400)
        .json({ message: "Incorrect Password. Try Again!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  //save a food
  async addFood({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedFood: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a food
  async removeFood({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedFoods: { foodId: params.foodId } } }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User Missing. Try Again!" });
    }
    return res.json(updatedUser);
  },
};
