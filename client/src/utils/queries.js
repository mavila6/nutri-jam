import { gql } from "@apollo/client";

// strMealThumb
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      foodCount
      savedFood {
        idMeal
        
        strMeal
        strIngredient1
        strIngredient2
        strIngredients3
        strInstructions
      }
    }
  }
`;
