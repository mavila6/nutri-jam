const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    foodCount: Int
    savedFood: [Food]
  }
  type Food {
    description: String
    foodId: String
    image: String
    link: String
    title: String
  }
  type Query {
    me: User
  }
  input SavedFoodInput {
    description: String
    foodId: String
    image: String
    link: String
    title: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedFood(food: SavedFoodInput): User
    removeFood(foodId: String!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
