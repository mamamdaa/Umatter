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
      _id
      first_name
      last_name
      email
      token
    }
  }
`;

export const GET_MESSAGES = gql`
query GetMessagesFromChannel($channelId: String!) {
  getMessagesFromChannel(channel_id: $channelId) {
    _id
    text
    sender
    sender_name
  }
}`
