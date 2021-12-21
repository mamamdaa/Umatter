import React from "react";
import "./css/home.css";
import background from "../img/background.svg";
import { HashLink as Link } from "react-router-hash-link";

export default function Home() {
  return (
    <div className="Home-box " id="home">
      <div className="Home ">
        <div class="Home-flex d-flex justify-content-center  ">
          <div class="container container1  mt-md-3">
            <h4 class="ms-sm-1 mt-5 fw-bold">Welcome to Umatter !</h4>
            <h1 class="mt-3 fw-bolder">We are here to hear.</h1>
            <p class="ms-sm-1 mt-sm-5">
              We provide personalized resources, available peer facilitators and
              professional counselors to attend to the welfare of our students'
              mental well-being. Controlling the stigma surrounding mental
              health by increasing the mental health knowledge of our students
              and staff through exclusive Care chat support with the
              university's Peer Facilitators and appointment sessions with our
              licensed professionals. Uncover insights on students' stressors
              through organizational surveys and monthly reports to help design
              effective approaches and strategies.
            </p>
            <span class="home-sign-up ">
              <Link smooth to="/Signup">
                <a class="btn btn1 btn-light fw-bold  " role="button">
                  Sign up for free
                </a>
              </Link>

              <Link smooth to="#Home-works">
                <a class="btn btn2 border m-4 " role="button">
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
    </div>
  );
}
