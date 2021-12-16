import React from "react";
import UserNavbar from "../inc/UserNavbar";
import Footer from "../inc/Footer-chat";
import background from "../img/background.svg";
import { Link } from "react-router-dom";
import "./css/user.css";

export default function User() {
  return (
    <div className="user-box">
      <UserNavbar />
      <div class="user">
        <div class="user-flex d-flex justify-content-center  ">
          <div class="container container1  mt-md-3">
            <h4 class="ms-sm-1 mt-5 fw-bold">Welcome to Umatter, Fredick !</h4>
            <h1 class="mt-3 fw-bolder">Thank you for signing up!</h1>
            <p class="ms-sm-1 mt-sm-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              consectetur mi cursus justo. Maecenas feugiat curabitur lacus,
              elementum neque. Maecenas feugiat curabitur lacus, elementum
              neque.
            </p>
            <span class="user-sign-up ">
              <a class="btn btn1 btn-light fw-bold  " href="#" role="button">
                Sign up for free
              </a>
              <Link to="/Signup">
                <a class="btn btn2 border m-4  " href="#" role="button">
                  How it works
                </a>
              </Link>
            </span>
          </div>

          <div class="container container2">
            <img class="me-4" src={background} alt="background" />
          </div>
        </div>
      </div>
      <div>sada</div>
      <Footer />
    </div>
  );
}
