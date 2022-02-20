import React from "react";
import "./css/about.css";
import mission from "../img/mission.svg";
import vision from "../img/vision.svg";
import values from "../img/values.svg";
import usaLogo from "../img/usa-logo.png";
import sgLogo from "../img/sg-logo.png";
import gdscLogo from "../img/gdsc-logo.png";
import peerLogo from "../img/peer-logo.png";

export default function About() {
  return (
    <div className="container-fluid about p-5" id="about">
      <h1 class="text-center fw-bolder mb-5">About us</h1>
      <div className="about-flex d-flex justify-content-center  p-4">
        <div className="  float-start">
          <h2 class=" text-center fw-bold mb-5">Umatter</h2>
          <p class="text-center mx-auto col-9">
            The students need different kinds of care at different times.
            Umatter can provide comprehensive care through our integrated
            digital platform. Umatter partners with the Guidance Services and
            Training Center of the University of San Agustin and the GSTC Peer
            Facilitators to provide relevant and timely mental health support.
          </p>
          <p class="text-center mx-auto col-9 mt-5">
            Our services are founded on the principles of education. Support and
            insights that allow students to effectively address mental health
            issues in the University and at their homes during this time of the
            Pandemic; to build resilience among them and increase productivity.
          </p>
        </div>
      </div>
      <div className="row partner-logo justify-content-center p-5">
        <div className="col-3 col-md-2">
          <img src={usaLogo} alt="usaLogo" />
        </div>
        <div className="col-3 col-md-2">
          <img src={sgLogo} alt="sgLogo" />
        </div>
        <div className="col-3 col-md-2">
          <img src={gdscLogo} alt="gdscLogo" />
        </div>
        <div className="col-3 col-md-2">
          <img src={peerLogo} alt="peerLogo" />
        </div>
      </div>

      <div className="row justify-content-center p-5 g-3">
        <div className="col-12 col-lg-4 ">
          <div class="card border-0 justify-content">
            <img class="m-3 align-self-center" src={mission} alt="vision" />
            <div class="card-body">
              <h4 class="card-title">Mission</h4>
              <p class="card-text">
                We hope to be a part of a future that the mental health advocacy
                aims to create, one of which has significant improvements in the
                state of mental well-being for our students.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div class="card border-0">
            <img class="m-3 align-self-center" src={vision} alt="vision" />
            <div class="card-body">
              <h4 class="card-title">Vision</h4>
              <p class="card-text">
                We hope to be a part of a future that the mental health advocacy
                aims to create, one of which has significant improvements in the
                state of mental well-being for our students.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div class="card border-0">
            <img class="m-3 align-self-center" src={values} alt="values" />
            <div class="card-body">
              <h4 class="card-title">Values</h4>
              <p class="card-text">
                Our Values are the set of core beliefs that influence our
                behaviors and conducts: Commitment, Compassion, and Camaraderie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
