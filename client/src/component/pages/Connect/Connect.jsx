import { useState, useMemo } from "react";
import Navbar from "../../inc/Navbar";
import ChatBox from "../../inc/ChatBox";
import { useEffect } from "react";
import {
  USER_ENTER_QUEUE,
  USER_LEAVE_QUEUE,
  USER_LEAVE_ROOM,
} from "../../../graphql/Mutations";
import { GET_USER } from "../../../graphql/Queries";
import { useMutation, useSubscription, useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ConnectWaitingBtn from "../../inc/Connect/connectWaitingBtn";
import ConnectLeaveBtn from "../../inc/Connect/connectLeaveBtn";
import ConnectEnterBtn from "../../inc/Connect/connectEnterBtn";
import "./connect.css";

const Connect = () => {
  const { isLoggedIn,client } = useSelector((state) => state.client);
  const [isInQueue, setIsInQueue] = useState(false);
  const [channelId, setChannel] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [currentFacilitatorId , setCurrentFacilitatorId] = useState("");

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
          clientId: client._id,
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
        clientId: client._id,
      },
    });
  };

  const leaveQueue = () => {
    console.log("leaving Queue");
    userLeaveQueue({
      variables: {
        clientId: client._id,
      },
    });
  };

  const leaveRoom = () => {
    console.log("leaving Room");
    userLeaveRoom({
      variables: {
        clientId: client._id,
        channelId: channelId, //what if refreshed? channel id should stored in local storage
        facilitatorId: currentFacilitatorId,
      },
    });
  };

  useEffect(() => {
    if (getUserError) {
      toast.error(getUserError.message);
    } else if (getUserData) {
      let userData = getUserData.getUser;
      console.log("getUserData", getUserData);
      setIsInQueue(userData.is_in_queue);
      setChannel(userData.channel_id);
      setIsInRoom(userData.is_assigned);
      setCurrentFacilitatorId(userData.assigned_to);
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
  //change to userEnterQueueData
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
    <>
      <Navbar />
      <div className="container-fluid main-background justify-content-center align-items-center vh-100 p-4 ">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 board-content p-0">
            {isInQueue || isInRoom ? (
              <ChatBox
                channelId={channelId}
                setIsInQueue={setIsInQueue}
                setIsInRoom={setIsInRoom}
                setCurrentFacilitatorId = {setCurrentFacilitatorId}
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
    </>
  );
};

export default Connect;
