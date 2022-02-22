import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation addUser(
    $last_name: String!
    $first_name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
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
  mutation UserEnterQueue($userId: String) {
    userEnterQueue(userId: $userId) {
      channel_id
    }
  }
`;

export const USER_LEAVE_QUEUE = gql`
  mutation UserLeaveQueue($userId: String) {
    userLeaveQueue(userId: $userId) {
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
    $userId: String!
    $channelId: String!
    $facilitatorId: String!
  ) {
    faciEnterRoom(
      userId: $userId
      channelId: $channelId
      facilitatorId: $facilitatorId
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
  mutation UserLeaveRoom($userId: String, $channelId: String) {
    userLeaveRoom(userId: $userId, channelId: $channelId) {
      _id
    }
  }
`;

export const FACI_LEAVE_ROOM = gql`
  mutation FaciLeaveRoom($facilitatorId: String, $channelId: String) {
    faciLeaveRoom(facilitatorId: $facilitatorId, channelId: $channelId) {
      _id
    }
  }
`;

export const FACI_JOIN_ROOM = gql`
  mutation FaciJoinRoom(
    $facilitatorId: String
    $channelId: String
    $userId: String
  ) {
    faciJoinRoom(
      facilitatorId: $facilitatorId
      channelId: $channelId
      userId: $userId
    ) {
      _id
    }
  }
`;
