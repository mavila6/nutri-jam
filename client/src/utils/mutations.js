import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_FOOD = gql`
  mutation saveFood($foodData: foodData!) {
    saveFood(foodData: $foodData) {
      _id
      username
      email
      savedFood {
        idMeal
        strMeal
      }
    }
  }
`;

export const REMOVE_FOOD = gql`
  mutation removeFood($idMeal: String!) {
    removeFood(idMeal: $idMeal) {
      _id
      username
      email
      savedFood {
        idMeal
        strMeal
      }
    }
  }
`;
