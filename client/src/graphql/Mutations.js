import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation userRegister(
    $last_name: String!
    $first_name: String!
    $email: String!
    $password: String!
  ) {
    userRegister(
      last_name: $last_name
      first_name: $first_name
      email: $email
      password: $password
    ) {
      _id
      email
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      first_name
      last_name
      email
      token
      role
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $text: String!
    $senderId: String!
    $channelId: String!
  ) {
    sendMessage(text: $text, senderId: $senderId, channelId: $channelId) {
      text
      sender_id
    }
  }
`;

export const USER_ENTER_QUEUE = gql`
  mutation UserEnterQueue($clientId: String) {
    userEnterQueue(clientId: $clientId) {
      channel_id
    }
  }
`;

export const USER_LEAVE_QUEUE = gql`
  mutation UserLeaveQueue($clientId: String) {
    userLeaveQueue(clientId: $clientId) {
      channel_id
    }
  }
`;

// export const USER_LEAVE_ROOM = gql`
//   mutation CleanRoom($channelId: String!) {
//     cleanRoom(channelId: $channelId) {
//       _id
//     }
//   }
// `;

//data return some not necessary
export const FACI_ENTER_ROOM = gql`
  mutation FaciEnterRoom(
    $clientId: String!
    $channelId: String!
    $clientId: String!
  ) {
    faciEnterRoom(
      clientId: $clientId
      channelId: $channelId
      clientId: $clientId
    ) {
      user {
        _id
        first_name
        last_name
        channel_id
      }
    }
  }
`;

export const USER_LEAVE_ROOM = gql`
  mutation UserLeaveRoom($clientId: String, $channelId: String, $facilitatorId: String) {
    userLeaveRoom(clientId: $clientId, channelId: $channelId, facilitatorId: $facilitatorId) {
      _id
    }
  }
`;
//refactor, add action when faci or user leave room instead of websocket
export const FACI_LEAVE_ROOM = gql`
  mutation FaciLeaveRoom($clientId: String, $channelId: String, $userId: String) {
    faciLeaveRoom(clientId: $clientId, channelId: $channelId, userId: $userId) {
      _id
    }
  }
`;

export const FACI_JOIN_ROOM = gql`
  mutation FaciJoinRoom(
    $clientId: String
    $channelId: String
    $userId: String
  ) {
    faciJoinRoom(clientId: $clientId, channelId: $channelId, userId: $userId) {
      _id
    }
  }
`;
