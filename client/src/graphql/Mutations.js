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
  mutation SendMessage($text: String!, $channel: String!, $sender: String!) {
    sendMessage(text: $text, channel: $channel, sender: $sender) {
      _id
      text
      sender
      sender_name
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

export const USER_LEAVE_ROOM = gql`
  mutation CleanRoom($channelId: String!) {
    cleanRoom(channelId: $channelId) {
      _id
    }
  }
`;

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
      }
      facilitator {
        _id
        first_name
        last_name
      }
      message {
        text
        sender
        sender_name
      }
    }
  }
`;
