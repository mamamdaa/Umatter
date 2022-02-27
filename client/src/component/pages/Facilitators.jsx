import React from "react";
import "./css/facilitators.css";
import Navbar from "./../inc/Navbar.jsx";
import faciOne from "../img/faci-1.png";
import faciTwo from "../img/faci-2.png";
import faciThree from "../img/faci-3.png";

const Facilitators = () => {
  return (
    <div id="facilitators">
      {/* <Navbar /> */}
      <div className="container-fluid facilitators">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 ">
            <h1>Meet our Peer Facilitators</h1>
            <p className="px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              animi deleniti cum obcaecati eum, rem doloribus, velit incidunt
              perspiciatis numquam voluptates voluptatibus? Error nostrum qui
              excepturi nulla nobis sint ipsam?
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-lg-4 text-center mt-md-3">
            <div class="card border-2">
              <img
                class="align-self-center card-img-top"
                src={faciTwo}
                alt="vision"
              />
              <div class="card-body">
                <h4 class="card-title">Lorem Ipsum</h4>
                <p class="card-text mb-3 px-4">
                  Marc Jofer C. Dimacutac
BS Computer Engineering (Embedded System)
                </p>

                <p class="card-text">
If you're happy and you know it Clap your hands

Gemini, multitalented, former sugar baby
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 text-center mt-md-3">
            <div class="card border-2">
              <img
                class="align-self-center card-img-top"
                src={faciThree}
                alt="vision"
              />
              <div class="card-body">
                <h4 class="card-title">Lorem Ipsum</h4>
                <p class="card-text mb-3 px-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p class="card-text">
                  We hope to be a part of a future that the mental health
                  advocacy aims to create, one of which has significant
                  improvements in the state of mental well-being for our
                  students.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 text-center mt-md-3">
            <div class="card border-2">
              <img
                class="align-self-center card-img-top"
                src={faciOne}
                alt="vision"
              />
              <div class="card-body">
                <h4 class="card-title">Lorem Ipsum</h4>
                <p class="card-text mb-3 px-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p class="card-text">
                  We hope to be a part of a future that the mental health
                  advocacy aims to create, one of which has significant
                  improvements in the state of mental well-being for our
                  students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilitators;
