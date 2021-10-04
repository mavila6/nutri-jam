const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Login Required");
    },
    donations: async (parent, { category, name }) => {
      const params = {};
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Donation.find(params).populate("");
    },
    donation: async (parent, { _id }) => {
      return await Donation.findById(_id).populate("");
    },
    donate: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "donates.donations",
          populate: "",
        });
        return user.donates.id(_id);
      }
      throw new AuthenticationError("You Must Be Logged In. Try Again!");
    },
    checkout: async (parent, args, context) => {
      const donate = new Donate({ donations: args.donations });
      const { donations } = await donate.populate("donations").execPopulate();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args);
      const user = await User.create(args);
      // add try catch block and console log error
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Email. Try Again!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password. Try Again!");
      }

      const token = signToken(user, password);
      return { token, user };
    },
    saveFood: async (parent, { food }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { foods: food } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You Need To Login!");
    },
    removeFood: async (parent, { foodId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { foods: food.foodId } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
