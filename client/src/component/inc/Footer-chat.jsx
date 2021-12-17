import { useEffect, useState,useRef } from "react";
import "./footer-chat.css";
import exit from "../img/exit.svg";
import emoji from "../img/emoji.svg";
import send from "../img/send.svg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMutation,useQuery,useLazyQuery,useSubscription} from "@apollo/client";
import {GET_MESSAGES} from "../../graphql/Queries";
import {SEND_MESSAGE} from "../../graphql/Mutations";
import {SUBSCRIBE_CHANNEL} from "../../graphql/Subscriptions";
import { useSelector, useDispatch } from "react-redux";
export default function Footer() {

  const [dataError, setDataError] = useState("");
  const [channelId, setChannelId] = useState("61bb16983cf78801ece1007e");
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const isUser = user._id

  const  { data:subscriptionData, error:subscriptionError } = useSubscription(SUBSCRIBE_CHANNEL, {
    variables: {
      channelId: "61bb16983cf78801ece1007e", //temp
    },
    onError: (err) => {
    },
  });

  const [sendMessage, { error: sendError, data: sendData }] = useMutation(SEND_MESSAGE, {
    onError: (err) => {
    },
  }); //refactor

  const  { error, data } = useQuery(GET_MESSAGES, {
    variables: {
      channelId: "61bb16983cf78801ece1007e", //temp
    },
    onError: (err) => {
     
    },
  }); //refactor

  const onSendData = async (e) => {
    e.preventDefault();
    sendMessage({
      variables: {
        text: myMessage, 
        channel: channelId, 
        sender: isUser
      },
    });
    setMyMessage("");
  };
        
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   getMessages({
  //     variables: {
  //       channelId: channelId
  //     },
  //   });
  // };

  useEffect(() => {
    if (subscriptionData) {
      if(subscriptionData.newMessage === null) return
      const newMessages =  Object.assign([], messages);
      newMessages.push(subscriptionData.newMessage)
      setMessages(newMessages);
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (data) {
      setMessages(data.getMessagesFromChannel);
    }
  }, [data]);

  
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  }; //refactor scroll only when you send message
  
  return (
    <div class="footer-container navbar ">
      <div class=" chat-box btn-group dropup ms-auto">
        <button
          class="btn border navbar-toggler"
          type="button"
          id="dropdownMenuClickableInside"
          data-bs-toggle="dropdown"
          data-bs-auto-close="false"
          aria-expanded="false"
        >
          Chatbox
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <ul
          class="contacts dropdown-menu  float-end"
          aria-labelledby="dropdownMenuClickableInside"
        >
          <li class="mb-1 border-bottom ">
            {" "}
            <img
              class="status mb-1"
              src="https://img.icons8.com/color/48/000000/connection-status-on--v1.png"
            />
            Facilitator
            <Link to="/User" class="exit-chat">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img class="float-end exit-chat" src={exit} alt="exit" />
            </Link>
          </li>
          {/* <form class="form-inline" onSubmit={submitHandler}>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Set Channel"
                onChange={(e) => setChannelId(e.target.value)}
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="submit">
                  <img src={send} alt="send" />
                </button>
              </div>
            </div>
          </form> */}
          
          <li class="message overflow-auto">
            {messages?.map((message) => (
              
              <div class="d-inline-block-flex">
                {message.sender === isUser ? (
                      <div className="d-flex justify-content-end">
                       <div class="d-inline-flex p-2 bg-success rounded-pill my-2 mx-2 ">{message.text} </div>
                       </div>
                      ) : (
                        <div class="d-inline-flex p-2 bg-info rounded-pill my-2 mx-2 "> {message.text} </div>
                      )}
              
                
                <AlwaysScrollToBottom/>
              </div>)
            )}
          </li>
          <li>
            <div class="chat input-group">
              <textarea
                placeholder="Type a Message"
                class="form-control border-0 border-top"
                value={myMessage}
                onChange={(e) => setMyMessage(e.target.value)}
              ></textarea>
              <span class=" send input-group-text border-0 border-top">
                <a type="button" class="me-2 ">
                  <img class="float-end" src={emoji} alt="emoji" />
                </a>
                <a type="button" >
                  <img class="float-end" src={send} alt="send" onClick={
                  onSendData
                } />
                </a>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
// <div class="footer-container navbar ">
//   <div class=" chat-box btn-group dropup ms-auto">
//     <button
//       type="button"
//       class="btn border navbar-toggler"
//       data-bs-toggle="dropdown"
//       aria-expanded="false"
//     >
//       Chatbox
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//     </button>

// <ul class="contacts dropdown-menu  float-end">
//   <li class="mb-1 border-bottom ">
//     {" "}
//     <img
//       class="status mb-1"
//       src="https://img.icons8.com/color/48/000000/connection-status-on--v1.png"
//     />
//     Facilitator
//     <Link to="/User" class="exit-chat ">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//       <img class="float-end" src={exit} alt="exit" />
//     </Link>
//   </li>
//   <li class="message"></li>
//   <li>
//     <div class="chat input-group">
//       <textarea
//         placeholder="Type a Message"
//         class="form-control border-0 border-top"
//       ></textarea>
//       <span class=" send input-group-text border-0 border-top">
//         <a type="button" class="me-2 ">
//           <img class="float-end" src={emoji} alt="emoji" />
//         </a>
//         <a type="button">
//           <img class="float-end" src={send} alt="send" />
//         </a>
//       </span>
//     </div>
//   </li>
// </ul>
//   </div>
// </div>
