import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      foodCount
      savedFood {
        idMeal
        strMealThumb
        strMeal
        strIngredient1
        strIngredient2
        strIngredients3
        strInstructions
        // strYoutube
      }
    }
  }
`;
