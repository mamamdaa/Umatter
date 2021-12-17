import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserNavbar from "../inc/UserNavbar";
import Navbar from "../inc/Navbar";
import Footer from "../inc/Footer-chat";
import { useHistory } from "react-router-dom";
import background from "../img/background.svg";
import { Link } from "react-router-dom";
import "./css/user.css";

export default function User() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <div className="user-box">
      <Navbar />
      <div class="user">
        <div class="user-flex d-flex justify-content-center  ">
          <div class="container container1  mt-md-3">
            <h4 class="ms-sm-1 mt-5 fw-bold">Welcome to Umatter, Fredick !</h4>
            <h1 class="mt-3 fw-bolder">Thank you for signing up!</h1>
            <p class="ms-sm-1 mt-sm-5">
              Looks like everything's set and done. You are ready! Check out our
              cool stuff we have in store for you. Our peer facilitators are
              ready when you are and one click of this button, you'll be
              redirected to answer the pre-assessment test and we are good to
              go!
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
