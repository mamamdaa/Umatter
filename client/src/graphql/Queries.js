import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getUsers {
      _id
      email
      first_name
      last_name
    }
  }
`;

export const LOGIN =  gql`
  mutation login($email: String!, $password: String!) {
    login(email:$email password:$password) {
      first_name
      last_name
      email
      token
    }
  }
`;
