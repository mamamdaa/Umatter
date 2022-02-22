import { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { CHANNEL_UPDATES } from "../../graphql/Subscriptions";
import { SEND_MESSAGE } from "../../graphql/Mutations";
import { useSubscription, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FaciChatBox = ({ channelId, setIsInRoom }) => {
  const { isLoggedIn, user: facilitator } = useSelector((state) => state.user);
  const [chatTitle, setChatTitle] = useState("");
  const [message, setMessage] = useState("");

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
    console.log(`New message incoming! ${newMessage}`);
    sendMessage({
      variables: {
        text: newMessage,
        senderId: facilitator._id,
        channelId: channelId,
      },
    });
  };

  useEffect(() => {
    if (channelUpdatesError) {
      let errorMessage = JSON.parse(
        JSON.stringify(channelUpdatesError.message)
      );
      toast(errorMessage);
    } else if (channelUpdatesData) {
      console.log("channelUpdatesData", channelUpdatesData);
      if (channelUpdatesData.channelUpdates.user) {
        let user = channelUpdatesData.channelUpdates.user;
        console.log("User Joined", user);
        if (user.action === "JOINED") {
          toast(`${user.first_name} ${user.last_name} has joined the channel`);
        } else if (user.action === "LEFT") {
          toast(`${user.first_name} ${user.last_name} has left the channel`);
          setIsInRoom(false);
        }
      }
      if (channelUpdatesData.channelUpdates.message) {
        if (
          channelUpdatesData.channelUpdates.message.sender_id ===
          facilitator._id
        ) {
          console.log("Message Sent");
        } else {
          addResponseMessage(channelUpdatesData.channelUpdates.message.text);
        }
      }
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

export default FaciChatBox;
