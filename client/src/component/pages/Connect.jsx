import { useState, useMemo } from "react";
import { MessageBox } from "react-chat-elements";
import { addResponseMessage } from "react-chat-widget";
import ChatBox from "../inc/ChatBox";
import { useEffect } from "react";
import {
  USER_ENTER_QUEUE,
  USER_LEAVE_QUEUE,
  USER_LEAVE_ROOM,
} from "../../graphql/Mutations";
import { GET_USER } from "../../graphql/Queries";
import { useMutation, useSubscription, useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ConnectWaitingBtn from "../inc/Connect/connectWaitingBtn";
import ConnectLeaveBtn from "../inc/Connect/connectLeaveBtn";
import ConnectEnterBtn from "../inc/Connect/connectEnterBtn";
import "./styles/Connect/connect.css";

const Connect = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isInQueue, setIsInQueue] = useState(false);
  const [channelId, setChannel] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);

  const [getUser, { error: getUserError, data: getUserData }] = useLazyQuery(
    GET_USER,
    {
      onError: (err) => {},
    }
  );

  useMemo(
    () =>
      getUser({
        variables: {
          userId: user._id,
        },
      }),
    []
  );

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
    if (getUserError) {
      toast.error(getUserError.message);
    } else if (getUserData) {
      console.log("getUserData", getUserData);
      if (getUserData.getUser.is_in_queue) {
        setIsInQueue(true);
      }else if(getUserData.getUser.is_assigned){
        setChannel(getUserData.getUser.channel_id);
        setIsInRoom(true);
      }
    }
  }, [getUserData]);

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
      setIsInQueue(true);
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
      setIsInQueue(false);
      toast("Left queue!");
    } else if (userLeaveError) {
      let errorMessage = JSON.parse(JSON.stringify(userLeaveError.message));
      console.log("userLeaveError", userLeaveError);
      toast("Error leaving queue!");
    }
  }, [userLeaveError, userLeaveData]);

  return (
    <div className="container-fluid justify-content-center align-items-center bg-secondary vh-100 p-4 ">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 board-content ">
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

          {isInQueue || isInRoom ? (
            <ChatBox
              channelId={channelId}
              setIsInQueue={setIsInQueue}
              setIsInRoom={setIsInRoom}
            />
          ) : (
            <div className="text-center">
              <h1>Connect to a channel</h1>
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center ">
        {isInQueue && !isInRoom ? (
          <ConnectWaitingBtn leaveQueue={leaveQueue} />
        ) : isInRoom ? (
          <ConnectLeaveBtn leaveRoom={leaveRoom} />
        ) : (
          <ConnectEnterBtn enterQueue={enterQueue} />
        )}
      </div>
    </div>
  );
};

export default Connect;
