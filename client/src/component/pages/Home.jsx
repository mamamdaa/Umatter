import React from "react";
import "./css/home.css";
import background from "../img/background.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home-box " id="home">
      <div className="Home ">
        <div class="Home-flex d-flex justify-content-center  ">
          <div class="container container1  mt-md-3">
            <h4 class="ms-sm-1 mt-5 fw-bold">Welcome to Umatter !</h4>
            <h1 class="mt-3 fw-bolder">We are here to hear.</h1>
            <p class="ms-sm-1 mt-sm-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              consectetur mi cursus justo. Maecenas feugiat curabitur lacus,
              elementum neque. Maecenas feugiat curabitur lacus, elementum
              neque.
            </p>
            <span class="home-sign-up ">
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

      <div className="Home-works">
        <h1 class="text-center mt-5 mb-5 ">How it Works?</h1>
        <div class="Home-works d-flex justify-content-center  ">
          <div class="container container1 text-center mt-md-3">
            <div class="content ms-5 me-5"></div>
          </div>

          <div class="container container2  p-5">
            <h3 class="text-center">Lorem ipsum dolor sit ame</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit
              massa sociis eu suscipit quam. Aliquet morbi vulputate malesuada
              gravida hendrerit tellus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Elit massa sociis eu suscipit quam. Aliquet morbi
              vulputate malesuada gravida hendrerit tellus.
            </p>
          </div>
        </div>{" "}
        <div class="Home-works d-flex justify-content-center  ">
          <div class="container container2  p-5">
            <h3 class="text-center">Lorem ipsum dolor sit ame</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit
              massa sociis eu suscipit quam. Aliquet morbi vulputate malesuada
              gravida hendrerit tellus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Elit massa sociis eu suscipit quam. Aliquet morbi
              vulputate malesuada gravida hendrerit tellus.
            </p>
          </div>
          <div class="container container1 text-center mt-md-3">
            <div class="content ms-5 me-5"></div>
          </div>
        </div>
        <div class="Home-works d-flex justify-content-center  ">
          <div class="container container1 text-center mt-md-3">
            <div class="content ms-5 me-5"></div>
          </div>

          <div class="container container2  p-5">
            <h3 class="text-center">Lorem ipsum dolor sit ame</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit
              massa sociis eu suscipit quam. Aliquet morbi vulputate malesuada
              gravida hendrerit tellus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Elit massa sociis eu suscipit quam. Aliquet morbi
              vulputate malesuada gravida hendrerit tellus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
