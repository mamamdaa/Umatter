import { useEffect, useState, useMemo } from "react";
import UserInQueue from "../cards/UserInQueue";
import FaciChatBox from "../inc/FaciChatBox";
import Navbar from "../inc/Navbar";
import { GET_USERS_IN_QUEUE } from "../../graphql/Queries";
import { QUEUE_UPDATES } from "../../graphql/Subscriptions";
import { FACI_LEAVE_ROOM, FACI_JOIN_ROOM } from "../../graphql/Mutations";
import { GET_FACILITATOR } from "../../graphql/Queries";
import {
  useQuery,
  useSubscription,
  useMutation,
  useLazyQuery,
} from "@apollo/client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./styles/Dashboard/dashboard.css";

const Dashboard = () => {
  const [usersInQueue, setUsersInQueue] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [channelId, setChannelId] = useState("");
  const { isLoggedIn, client } = useSelector((state) => state.client);
  const [currentUserId, setCurrentUserId] = useState("");

  const [
    getFacilitator,
    { error: getFacilitatorError, data: getFacilitatorData },
  ] = useLazyQuery(GET_FACILITATOR, {
    onError: (err) => {},
  });

  useMemo(
    () =>
      getFacilitator({
        variables: {
          clientId: client._id,
        },
      }),
    []
  );

  const { data: queueUpdateData, error: queueUpdateError } = useSubscription(
    QUEUE_UPDATES,
    {
      onError: (err) => {},
    }
  );

  const { error: getUsersInQueueError, data: getUsersInQueueData } = useQuery(
    GET_USERS_IN_QUEUE,
    {
      onError: (err) => {},
    }
  );

  const [
    faciLeaveRoom,
    { error: faciLeaveRoomError, data: faciLeaveRoomData },
  ] = useMutation(FACI_LEAVE_ROOM, {
    onError: (err) => {},
  });

  const [faciJoinRoom, { error: faciJoinRoomError, data: faciJoinRoomData }] =
    useMutation(FACI_JOIN_ROOM, {
      onError: (err) => {},
    });

  const acceptHandler = (user) => {
    faciJoinRoom({
      variables: {
        userId: user._id,
        channelId: user.channel_id,
        clientId: client._id,
      },
    });
    setCurrentUserId(user._id);
    setChannelId(user.channel_id);
  };

  const facileaveRoom = () => {
    faciLeaveRoom({
      variables: {
        clientId: client._id,
        channelId: channelId, //what if refreshed? channel id should stored in local storage
        userId: currentUserId,
      },
    });
  };

  useEffect(() => {
    if (getFacilitatorError) {
      toast.error(getFacilitatorError.message);
    } else if (getFacilitatorData) {
      let facilitatorData = getFacilitatorData.getFacilitator;
      setChannelId(facilitatorData.channel_id);
      setIsInRoom(facilitatorData.is_assigned);
      setCurrentUserId(facilitatorData.assigned_to);
    }
  }, [getFacilitatorData, getFacilitatorError]);

  useEffect(() => {
    if (queueUpdateError) {
      let errorMessage = JSON.parse(JSON.stringify(queueUpdateError.message));
      toast.error(errorMessage);
    } else if (queueUpdateData && !isInRoom) {
      let user = queueUpdateData.queueUpdate;
      if (user.action === "JOINED") {
        setUsersInQueue([...usersInQueue, user]);
      } else if (user.action === "LEFT") {
        setUsersInQueue(usersInQueue.filter((u) => u.id !== user.id));
      }
    }
  }, [queueUpdateData, queueUpdateError]);

  useEffect(() => {
    if (getUsersInQueueError) {
      console.log(getUsersInQueueError);
    } else if (getUsersInQueueData) {
      setUsersInQueue(getUsersInQueueData.getUsersInQueue);
    }
  }, [getUsersInQueueData, getUsersInQueueError]);

  useEffect(() => {
    if (faciJoinRoomError) {
      let errorMessage = JSON.parse(JSON.stringify(faciJoinRoomError.message));
      toast.error(errorMessage);
    } else if (faciJoinRoomData) {
      toast("You have entered the room");
      setIsInRoom(true);
    }
  }, [faciJoinRoomData, faciJoinRoomError]);

  useEffect(() => {
    if (faciLeaveRoomError) {
      let errorMessage = JSON.parse(JSON.stringify(faciLeaveRoomError.message));
      toast.error(errorMessage);
    } else if (faciLeaveRoomData) {
      toast("You have left the room");
      setIsInRoom(false);
    }
  }, [faciLeaveRoomData, faciLeaveRoomError]);

  return (
    <>
      <Navbar />
      <div className="container-fluid main-background justify-content-center align-items-center vh-100 p-4">
        <div className="row justify-content-center overflow-auto mt-5">
          <div className="col-12 col-md-6 board-content p-2">
            {usersInQueue.length > 0
              ? usersInQueue.map((user) => (
                <>
                 <UserInQueue
                    key={user._id}
                    user={user}
                    acceptHandler={acceptHandler}
                  />
                </>
                ))
              : null}
            {isInRoom ? (
              <FaciChatBox channelId={channelId} setIsInRoom={setIsInRoom} />
            ) : null}
          </div>
        </div>
        {isInRoom ? (
          <div className="row justify-content-center">
            <button
              type="button"
              className="btn btn-light button-control"
              onClick={() => facileaveRoom()}
            >
              <span className="material-icons">exit_to_app</span>
              <p className="d-inline">Leave Room</p>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
