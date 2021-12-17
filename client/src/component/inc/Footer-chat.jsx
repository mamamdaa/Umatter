import React from "react";
import "./footer-chat.css";
import exit from "../img/exit.svg";
import emoji from "../img/emoji.svg";
import send from "../img/send.svg";
import { Link } from "react-router-dom";

export default function Footer() {
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
          <li class="message"></li>
          <li>
            <div class="chat input-group">
              <textarea
                placeholder="Type a Message"
                class="form-control border-0 border-top"
              ></textarea>
              <span class=" send input-group-text border-0 border-top">
                <a type="button" class="me-2 ">
                  <img class="float-end" src={emoji} alt="emoji" />
                </a>
                <a type="button">
                  <img class="float-end" src={send} alt="send" />
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
