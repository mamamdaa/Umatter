import React from "react";
import "./css/works.css";
import img1 from "../img/img1.svg";
import img2 from "../img/img2.svg";
import img3 from "../img/img3.svg";

export default function Works() {
  return (
    <div>
      <div className="Home-works" id="Home-works">
        <h1 class="text-center mt-5 mb-5 ">How it Works?</h1>
        <div class="Home-works d-flex justify-content-center  ">
          <div class="container container1 text-center mt-md-3">
            <div class="content ms-5 me-5">
              <img class="me-4 w-100 h-100" src={img1} alt="img1" />
            </div>
          </div>

          <div class="container container2  p-5">
            <h3 class="text-center">Create an account to Umatter</h3>
            <p>
              Go to the Umatter Sign In page, Click Create account, Enter your
              name, Enter your current email address, Click Next, Verify your
              email address with the code sent to your existing email, Click
              Verify.
            </p>
          </div>
        </div>{" "}
        <div class="Home-works d-flex justify-content-center">
          <div class="container container2 p-5">
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
            <div class="content ms-5 me-5">
              <img class="me-4 w-100 h-100" src={img2} alt="img2" />
            </div>
          </div>
        </div>
        <div class="Home-works d-flex justify-content-center  ">
          <div class="container container1 text-center mt-md-3">
            <div class="content ms-5 me-5">
              {" "}
              <img class="me-4 w-100 h-100" src={img3} alt="img3" />
            </div>
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
