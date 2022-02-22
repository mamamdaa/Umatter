import { useEffect, useState } from "react";
import UserInQueue from "../cards/UserInQueue";
import FaciChatBox from "../inc/FaciChatBox";
import { GET_USERS_IN_QUEUE } from "../../graphql/Queries";
import { QUEUE_UPDATES } from "../../graphql/Subscriptions";
import {
  FACI_ENTER_ROOM,
  FACI_LEAVE_ROOM,
  FACI_JOIN_ROOM,
} from "../../graphql/Mutations";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [usersInQueue, setUsersInQueue] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [channelId, setChannelId] = useState("");
  const { isLoggedIn, user: facilitator } = useSelector((state) => state.user);

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
    faciEnterRoom,
    { error: faciEnterRoomError, data: faciEnterRoomData },
  ] = useMutation(FACI_ENTER_ROOM, {
    onError: (err) => {},
  });

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
    // faciEnterRoom({
    //   variables: {
    //     userId: user._id,
    //     channelId: user.channel_id,
    //     facilitatorId: facilitator._id,
    //   },
    // });
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

  // useEffect(() => {
  //   if (faciEnterRoomError) {
  //     let errorMessage = JSON.parse(JSON.stringify(faciEnterRoomError.message));
  //     toast.error(errorMessage);
  //   } else if (faciEnterRoomData) {
  //     toast("You have entered the room");
  //     setIsInRoom(true);
  //   }
  // }, [faciEnterRoomData, faciEnterRoomError]);

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
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-6">
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
            <div>
              <FaciChatBox channelId={channelId} setIsInRoom={setIsInRoom} />
              <button
                className="btn btn-danger"
                onClick={() => {
                  facileaveRoom();
                }}
              >
                {" "}
                Leave Room{" "}
              </button>
            </div>
          ) : (
            <h1>You are not in room</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;