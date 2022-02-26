import { gql } from "@apollo/client";

export const CHANNEL_UPDATES = gql`
  subscription ChannelUpdates($channelId: String) {
    channelUpdates(channelId: $channelId) {
      message {
        text
        sender_id
      }
      facilitator {
        _id
        first_name
        last_name
        action
      }
      user {
        _id
        first_name
        last_name
        action
      }
      isChannelExists
    }
  }
`;

export const QUEUE_UPDATES = gql`
  subscription QueueUpdate {
    queueUpdate {
      _id
      first_name
      last_name
      is_in_queue
      channel_id
      action
    }
  }
`;
