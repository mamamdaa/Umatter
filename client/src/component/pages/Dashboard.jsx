import { useEffect, useState, useMemo } from "react";
import UserInQueue from "../cards/UserInQueue";
import FaciChatBox from "../inc/FaciChatBox";
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
  const { isLoggedIn, user: facilitator } = useSelector((state) => state.user);

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
          facilitatorId: facilitator._id,
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
        facilitatorId: facilitator._id,
      },
    });
    setChannelId(user.channel_id);
  };

  const facileaveRoom = () => {
    console.log("leaving Room");
    faciLeaveRoom({
      variables: {
        facilitatorId: facilitator._id,
        channelId: channelId, //what if refreshed? channel id should stored in local storage
      },
    });
  };

  useEffect(() => {
    if (getFacilitatorError) {
      toast.error(getFacilitatorError.message);
    } else if (getFacilitatorData) {
      if (getFacilitatorData.getFacilitator.is_assigned) {
        console.log(getFacilitatorData.getFacilitator.channel_id);
        setChannelId(getFacilitatorData.getFacilitator.channel_id);
        setIsInRoom(true);
      }
    }
  }, [getFacilitatorData, getFacilitatorError]);

  useEffect(() => {
    if (queueUpdateError) {
      let errorMessage = JSON.parse(JSON.stringify(queueUpdateError.message));
      toast.error(errorMessage);
    } else if (queueUpdateData) {
      console.log("queueUpdateData", queueUpdateData);
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
    <div className="container-fluid justify-content-center align-items-center bg-secondary vh-100 p-4">
      <div className="row justify-content-center">
        <div className="col  board-content">
          {usersInQueue.length > 0 ? (
            usersInQueue.map((user) => (
              <UserInQueue
                key={user._id}
                user={user}
                acceptHandler={acceptHandler}
              />
            ))
          ) : (
            <h1>No users in queue</h1>
          )}
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
  );
};

export default Dashboard;
