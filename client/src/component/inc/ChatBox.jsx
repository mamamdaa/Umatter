import { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { CHANNEL_UPDATES } from "../../graphql/Subscriptions";
import { useSubscription } from "@apollo/client";
import { toast } from "react-toastify";

const ChatBox = ({ channelId, setIsWaiting,setIsInRoom }) => {
  const [chatTitle, setChatTitle] = useState("Wait for your Peer Facilitator");

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  const { data: channelUpdatesData, error: channelUpdatesError } =
    useSubscription(CHANNEL_UPDATES, {
      variables: {
        channelId: channelId, //temp
      },
      onError: (err) => {},
    });

  useEffect(() => {
    if (channelUpdatesData) {
      if (channelUpdatesData.channelUpdates.facilitator) {
        let faciFirstName =
          channelUpdatesData.channelUpdates.facilitator.first_name;
        let faciLastName =
          channelUpdatesData.channelUpdates.facilitator.last_name;
        toast("Facilitator has joined the channel!");
        setChatTitle(`Hi! I'm ${faciFirstName} ${faciLastName}`);
        setIsWaiting(false);
        setIsInRoom(true);
      } else if (channelUpdatesData.channelUpdates.message) {
        addResponseMessage(channelUpdatesData.channelUpdates.message.text);
      }
    } else if (channelUpdatesError) {
      let errorMessage = JSON.parse(
        JSON.stringify(channelUpdatesError.message)
      );
      console.log("channelUpdatesError",errorMessage);

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
