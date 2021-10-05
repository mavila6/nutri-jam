const { gql } = require("apollo-server-express");

//type Food needs to be modified to API
//type: Food possibly need to add userId
//how do we add the ingredients array
// strYoutube: [String]
// strMealThumb: img
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    foodCount: Int
    savedFood: [Food]
  }
  type Food {
    idMeal: ID!
    strMeal: String
    strIngredient1: String
    strIngredient2: String
    strIngredient3: String
    strInstructions: String
  }
  type Query {
    me: User
  }
  input foodData {
    idMeal: ID!
    strMeal: String
    strIngredient1: String
    strIngredient2: String
    strIngredient3: String
    strInstructions: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveFood(food: foodData!): User
    removeFood(idMeal: String!): User
  }
  type Auth {
    token: ID!
    user: User!
  }
`;

module.exports = typeDefs;
