import { gql } from "@apollo/client";

export const SUBSCRIBE_CHANNEL = gql`
  subscription Subscription($channel: String) {
    newMessage(channel: $channel) {
      _id
      text
      sender
      sender_name
    }
  }
`;
