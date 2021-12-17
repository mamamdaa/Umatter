import { gql } from "@apollo/client";

export const REGISTER =  gql`
    mutation addUser($last_name:String!,$first_name:String!,$email:String!, $password:String!){
        addUser(last_name:$last_name,first_name:$first_name,email:$email, password:$password) {
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
