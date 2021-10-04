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
      const url = new URL(context.headers.referer).origin;
      const donate = new Donate({ donations: args.donations });
      const line_items = [];

      const { donations } = await donate.populate("donations").execPopulate();

      for (let i = 0; i < donations.length; i++) {
        const donation = await stripe.donations.create({
          name: donations[i].name,
          description: donations[i].description,
          images: [`${url}/images/${donations[i].image}`],
        });

        const amount = await stripe.amounts.create({
          donation: donation.id,
          unit_amount: donations[i].amount * 100,
          currency: "usd",
        });

        line_items.push({
          amount: amount.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
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
    addDonate: async (parent, { donations }, context) => {
      console.log(context);
      if (context.user) {
        const donate = new Donate({ donations });

        await Use.findByIdAndUpdate(context.user._id, {
          $push: { donates: donate },
        });

        return donate;
      }
      throw new AuthenticationError("You Must Be Logged In. Try Again!");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("You Must Be Logged In. Try Again!");
    },
    updateDonation: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Donation.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
