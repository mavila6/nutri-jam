const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type: User {
    _id: ID
    username: String
    email: String
    foodCount: Int
    savedFood: [Food]
  }
`;

module.exports = typeDefs;
