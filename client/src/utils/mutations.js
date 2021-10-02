import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_FOOD = gql`
  mutation saveFood($content: savedFoodInput!) {
    saveFood(content: $content) {
      _id
      username
      savedFood {
        foodId
        title
      }
    }
  }
`;

export const REMOVE_FOOD = gql`
  mutation removeFood($foodId: String!) {
    removeFood(foodId: $foodId) {
      _id
      username
      savedFood {
        foodId
        title
      }
    }
  }
`;
