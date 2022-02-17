//create a reat component for chat room with green button at center bottom with text "Enter Chat Room"
import { useState, useEffect } from "react";
import { ENTER_QUEUE, LEAVE_QUEUE } from "../../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
const ChatRoom = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isWaiting, setIsWaiting] = useState(false);

  const [enterQueue, { error: enterError, data: enterData }] =
    useMutation(ENTER_QUEUE);
  const [leaveQueue, { error: leaveError, data: leaveData }] =
    useMutation(LEAVE_QUEUE);

  const enterRoom = () => {
    enterQueue({
      variables: {
        id: user._id,
      },
    });
  };
  const leaveRoom = () => {
    if (isWaiting) {
      leaveQueue({
        variables: {
          id: user._id,
        },
      });
    }
  };

  useEffect(() => {
    if (enterData) {
      setIsWaiting(true);
    }
  }, [enterData]);

  useEffect(() => {
    if (leaveData) {
      setIsWaiting(false);
    }
  }, [leaveData]);

  return (
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm">
        <div class="card-header py-3 d-flex">
          <h4 class="my-0 fw-normal">Chatroom</h4>
          <button
            type="button"
            class="btn justify-content d-flex align-items-center  ms-auto"
            onClick={() => leaveRoom()}
          >
            <span class="material-icons d-flex ">close</span>
          </button>
        </div>
        <div class="card-body">
          {isWaiting ? (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <ul class="list-unstyled mt-3 mb-4">
                <li>Answer This</li>
              </ul>

              <button
                type="button"
                class="w-100 btn btn-lg btn-primary"
                onClick={() => enterRoom()}
              >
                Enter Room
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
