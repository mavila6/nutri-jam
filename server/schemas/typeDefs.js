const { gql } = require("apollo-server-express");

//type Food needs to be modified to API
//type: Food possibly need to add userId
//how do we add the ingredients array
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    foodCount: Int
    savedFood: [Food]
  }
  type Food {
    foodId: String
    title: String
    link: String
    source: String
    totalTime: String
    ingredients: [""]
  }
  type Query {
    me: User
  }
  input savedFoodInput {
    foodId: String
    userId: String
    title: String
    link: String
    source: String
    totalTime: String
    ingredients: []
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveFood(food: savedFoodInput): User
    removeFood(foodId: String!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
