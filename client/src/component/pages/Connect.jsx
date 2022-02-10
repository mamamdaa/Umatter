import React from "react";
import { MessageBox } from "react-chat-elements";
import { Widget,addResponseMessage  } from "react-chat-widget";
import { useEffect } from "react";

const Connect = () => {
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
          <Widget 
            handleNewUserMessage={handleNewUserMessage} 
         
            fullScreenMode = {false}
          />
        </div>
      </div>
    </div>
  );
};

export default Connect;
