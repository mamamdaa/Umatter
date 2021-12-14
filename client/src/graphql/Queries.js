import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getUsers{
      _id
      email
      first_name
      last_name
    }
  }
`;
