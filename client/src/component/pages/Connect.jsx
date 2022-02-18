import { useState } from "react";
import { MessageBox } from "react-chat-elements";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useEffect } from "react";
import { ENTER_QUEUE, LEAVE_QUEUE } from "../../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

const Connect = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isWaiting, setIsWaiting] = useState(false);

  const [enterQueue, { error: enterError, data: enterData }] =
    useMutation(ENTER_QUEUE,{
      onError: (err) => {
        console.log(JSON.parse(JSON.stringify(err)));
      },
    });
    
  const [leaveQueue, { error: leaveError, data: leaveData }] =
    useMutation(LEAVE_QUEUE);

  const enterRoom = () => {
    enterQueue({
      variables: {
        id: 123,
      },
    })
  };

  useEffect(() => {
    if (enterError) {
      let error = JSON.parse(JSON.stringify(enterError))

      console.log(error);
      console.log(enterData)
    }
  }, [enterError]);


  const leaveRoom = () => {
    if (isWaiting) {
      leaveQueue({
        variables: {
          id: user._id,
        },
      });
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
  }, []);
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
  return (
    <div className="container d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="row justify-content-center vw-100 vh-100 bg-danger p-5">
        <div className="col-md-8 bg-primary">
          <button type="button" className="btn btn-primary btn-lg btn-block"
            onClick={() => enterRoom()}
          >
            <span className="material-icons">chat</span>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-block"
            onClick={() => leaveRoom()}
          >
            <span className="material-icons">close</span>
          </button>
          {isWaiting ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <> </>
          )}
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            fullScreenMode={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Connect;
