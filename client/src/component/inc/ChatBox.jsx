import { useEffect, useState } from "react";
import {
  Widget,
  addResponseMessage,
} from "react-chat-widget";
import { CHANNEL_UPDATES } from "../../graphql/Subscriptions";
import { SEND_MESSAGE } from "../../graphql/Mutations";
import { useSubscription, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ChatBox = ({ channelId, setIsWaiting, setIsInRoom }) => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [chatTitle, setChatTitle] = useState("Wait for your Peer Facilitator");

  const { data: channelUpdatesData, error: channelUpdatesError } =
    useSubscription(CHANNEL_UPDATES, {
      variables: {
        channelId: channelId, //temp
      },
      onError: (err) => {},
    });
  const [sendMessage, { data: sendMessageData, error: sendMessageError }] =
    useMutation(SEND_MESSAGE, {
      onError: (err) => {},
    });
  const handleNewUserMessage = (newMessage) => {
    sendMessage({
      variables: {
        text: newMessage,
        senderId: user._id,
        channelId: channelId,
      },
    });
  };
  useEffect(() => {
    if (channelUpdatesData) {
      if (channelUpdatesData.channelUpdates.facilitator) {
          let facilitator = channelUpdatesData.channelUpdates.facilitator;
          if (facilitator.action === "JOINED") {
            setChatTitle(`${facilitator.first_name} ${facilitator.last_name}`);
            setIsWaiting(false);
            setIsInRoom(true);
            toast(`${facilitator.first_name} ${facilitator.last_name} has joined the channel`);
          }else if(facilitator.action === "LEFT"){
            setIsInRoom(false);
            toast(`${facilitator.first_name} ${facilitator.last_name} has left the channel`);
          }
     
      } else if (channelUpdatesData.channelUpdates.message) {
        if (channelUpdatesData.channelUpdates.message.sender_id === user._id) {
          console.log("Message Sent");
        } else {
          addResponseMessage(channelUpdatesData.channelUpdates.message.text);
        }
      }
    } else if (channelUpdatesError) {
      let errorMessage = JSON.parse(
        JSON.stringify(channelUpdatesError.message)
      );
      console.log("channelUpdatesError", errorMessage);

      toast(errorMessage);
    }
  }, [channelUpdatesData, channelUpdatesError]);

  return (
    <div>
      {" "}
      <Widget
        title={chatTitle}
        handleNewUserMessage={handleNewUserMessage}
        fullScreenMode={false}
      />
    </div>
  );
};

export default ChatBox;
