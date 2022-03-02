import { useState, useMemo } from "react";
import Navbar from "../../inc/Navbar";
import ChatBox from "../../inc/ChatBox";
import { useEffect } from "react";
import {
  USER_ENTER_QUEUE,
  USER_LEAVE_QUEUE,
  USER_LEAVE_ROOM,
} from "../../../graphql/Mutations";
import { GET_USER, GET_AVAILABLE_FACILITATORS } from "../../../graphql/Queries";
import { AVAILABLE_FACILITATORS_UPDATES } from "../../../graphql/Subscriptions";
import {
  useMutation,
  useSubscription,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ConnectWaitingBtn from "../../inc/Connect/connectWaitingBtn";
import ConnectLeaveBtn from "../../inc/Connect/connectLeaveBtn";
import ConnectEnterBtn from "../../inc/Connect/connectEnterBtn";
import "./connect.css";

const Connect = () => {
  const { isLoggedIn, client } = useSelector((state) => state.client);
  const [isInQueue, setIsInQueue] = useState(false);
  const [channelId, setChannel] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [currentFacilitatorId, setCurrentFacilitatorId] = useState("");
  const [availableFacilitators, setAvailableFacilitators] = useState([]);

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

  const { error: availableFacilitatorsError, data: availableFacilitatorsData } =
    useSubscription(AVAILABLE_FACILITATORS_UPDATES, {
      variables: {
        clientId: client._id,
        role: client.role,
      },
      onError: (err) => {},
    });

  const {
    error: getAvailableFacilitatorsError,
    data: getAvailableFacilitatorsData,
  } = useQuery(GET_AVAILABLE_FACILITATORS, {
    onError: (err) => {},
  });

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

  useEffect(() => {
    if (getAvailableFacilitatorsError) {
      toast.error(getAvailableFacilitatorsError.message);
    } else if (getAvailableFacilitatorsData) {
      let facilitators = getAvailableFacilitatorsData.getAvailableFacilitators;
      setAvailableFacilitators(facilitators);
    }
  }, [getAvailableFacilitatorsData, getAvailableFacilitatorsError]);

  useEffect(() => {
    if (availableFacilitatorsError) {
      toast.error(availableFacilitatorsError.message);
    } else if (availableFacilitatorsData) {
      let facilitator = availableFacilitatorsData.availableFacilitatorsUpdate;
      console.log("facilitator", facilitator);
      if (facilitator.action === "IS_AVAILABLE") {
        setAvailableFacilitators((prev) => [...prev, facilitator]);
      }
      if (facilitator.action === "IS_NOT_AVAILABLE") {
 
        setAvailableFacilitators((prev) =>
          prev.filter((f) => f._id !== facilitator._id)
        );
      }
    }
  }, [availableFacilitatorsError, availableFacilitatorsData]);

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
                setCurrentFacilitatorId={setCurrentFacilitatorId}
              />
            ) : (
              <div className="d-flex text-center align-items-center justify-content-center m-2">
                <span class="material-icons-outlined">people</span>
                <p className="d-inline m-0">
                  Available Facilitators: {availableFacilitators.length}
                </p>
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
