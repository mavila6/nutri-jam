import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      foodCount
      savedFood {
        foodId
        recipe
        user_id
        description
        image
      }
    }
  }
`;
