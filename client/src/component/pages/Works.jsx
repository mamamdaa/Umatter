import React from "react";
import "./css/works.css";
import img1 from "../img/img1.svg";
import img2 from "../img/img2.svg";
import img3 from "../img/img3.svg";

export default function Works() {
  return (
    <div className="container-fluid home-works p-5" id="Home-works">
      <h1 class="text-center mt-5 mb-5 ">How it Works?</h1>
      <div class="row">
        <div class="col-12 col-lg-5 text-center mt-md-3">
          <img class="me-4" src={img1} alt="img1" />
        </div>
        <div class=" col-lg-6  p-5">
          <h3 class="mb-3">Create an account to Umatter</h3>
          <p>
            Go to the Umatter Sign In page, Click Create account, Enter your
            name, Enter your current email address, Click Next, Verify your
            email address with the code sent to your existing email, Click
            Verify.
          </p>
        </div>
      </div>
      <div class="row flex-wrap-reverse mb-5">
        <div class=" col-lg-6  p-5">
          <h3 class="mb-3">Answer our Pre-Assessment </h3>
          <p>
            It's hard to talk to people about our mental health, but it’s also
            hard not to. It’s easier if you have some details in advance and can
            tell your peer facilitator at the beginning of our session.
          </p>
        </div>
        <div class="col-12 col-lg-5 text-center mt-md-3">
          <img class="me-4" src={img2} alt="img2" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-5 text-center mt-md-3">
          <img class="me-4 mb-5" src={img3} alt="img3" />
        </div>
        <div class="  col-lg-6 p-6">
          <h3 class="">Connect or chat to the facilitator</h3>
          <p>
            People have questions about mental health and emotional well-being.
            They need answers from friends they trust in a way that they can
            understand. Connect with our Peer Facilitators. We are here to hear
          </p>
        </div>
      </div>

      {/* <div class=" d-flex justify-content-center">
        <div class=" p-5">
          <h3 class="text-center">Answer our Pre-Assessment </h3>
          <p>
            It's hard to talk to people about our mental health, but it’s also
            hard not to. It’s easier if you have some details in advance and can
            tell your peer facilitator at the beginning of our session.
          </p>
        </div>
        <div class="  text-center mt-md-3">
          <div class="ms-5 me-5">
            <img class="me-4" src={img2} alt="img2" />
          </div>
        </div>
      </div>
      <div class=" d-flex justify-content-center  ">
        <div class="  text-center mt-md-3">
          <div class="ms-5 me-5">
            {" "}
            <img class="me-4" src={img3} alt="img3" />
          </div>
        </div>

        <div class="  p-5">
          <h3 class="text-center">Connect or chat to the facilitator</h3>
          <p>
            People have questions about mental health and emotional well-being.
            They need answers from friends they trust in a way that they can
            understand. Connect with our Peer Facilitators. We are here to hear
            you
          </p>
        </div>
      </div> */}
    </div>
  );
}
