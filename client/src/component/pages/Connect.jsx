import { useState } from "react";
import { MessageBox } from "react-chat-elements";
import { addResponseMessage } from "react-chat-widget";
import ChatBox from "../inc/ChatBox";
import { useEffect } from "react";
import {
  USER_ENTER_QUEUE,
  USER_LEAVE_QUEUE,
  USER_LEAVE_ROOM,
} from "../../graphql/Mutations";
import { useMutation, useSubscription } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Connect = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isWaiting, setIsWaiting] = useState(false);
  const [channelId, setChannel] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);

  const [userEnterQueue, { error: userEnterError, data: userEnterData }] =
    useMutation(USER_ENTER_QUEUE, {
      onError: (err) => {},
    });

  const [userLeaveQueue, { error: userLeaveError, data: userLeaveData }] =
    useMutation(USER_LEAVE_QUEUE, {
      onError: (err) => {},
    });

  const [
    userLeaveRoom,
    { error: userLeaveRoomError, data: userLeaveRoomData },
  ] = useMutation(USER_LEAVE_ROOM, {
    onError: (err) => {},
  });

  const enterQueue = () => {
    userEnterQueue({
      variables: {
        userId: user._id,
      },
    });
  };

  const leaveQueue = () => {
    console.log("leaving Queue");
    userLeaveQueue({
      variables: {
        userId: user._id,
      },
    });
  };

  const leaveRoom = () => {
    console.log("leaving Room");
    userLeaveRoom({
      variables: {
        userId: user._id,
        channelId: channelId, //what if refreshed? channel id should stored in local storage
      },
    });
  };

  useEffect(() => {
    if (userLeaveRoomData) {
      setIsInRoom(false);
      setChannel("");
      toast("You have left the room");
    } else if (userLeaveRoomError) {
      let errorMessage = JSON.parse(JSON.stringify(userLeaveRoomError.message));
      console.log("userLeaveRoomError", userLeaveRoomError);
      toast(errorMessage);
    }
  }, [userLeaveRoomData, userLeaveRoomError]);

  useEffect(() => {
    if (userEnterData) {
      setIsWaiting(true);
      toast("Entered Queue!");
      console.log(userEnterData);
      setChannel(userEnterData.userEnterQueue.channel_id);
    } else if (userEnterError) {
      let errorMessage = JSON.parse(JSON.stringify(userEnterError.message));
      console.log("userEnterError", userEnterError);
      toast(errorMessage);
    }
  }, [userEnterData, userEnterError]);

  useEffect(() => {
    if (userLeaveData) {
      setIsWaiting(false);
      toast("Left queue!");
    } else if (userLeaveError) {
      let errorMessage = JSON.parse(JSON.stringify(userLeaveError.message));
      console.log("userLeaveError", userLeaveError);
      toast("Error leaving queue!");
    }
  }, [userLeaveError, userLeaveData]);

  return (
    <div className="container d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="row justify-content-center vw-100 vh-100 bg-danger p-5">
        <div className="col-md-8 bg-primary">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => enterQueue()}
          >
            <span className="material-icons">chat</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => leaveQueue()}
          >
            <span className="material-icons">close</span>
          </button>

          {isInRoom ? (
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={() => leaveRoom()}
            >
              <span className="material-icons">exit_to_app</span>
            </button>
          ) : null}

          {isWaiting ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <> </>
          )}
          {isWaiting || isInRoom ? (
            <ChatBox
              channelId={channelId}
              setIsWaiting={setIsWaiting}
              setIsInRoom={setIsInRoom}
            />
          ) : (
            <div className="text-center">
              <h1>Connect to a channel</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
