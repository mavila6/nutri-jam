import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      foodCount
      savedFoods {
        foodId
        title
        recipe
        image
        description
      }
    }
  }
`;
