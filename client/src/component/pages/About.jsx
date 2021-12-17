import React from "react";
import "./css/about.css";
import mission from "../img/mission.svg";
import vision from "../img/vision.svg";
import values from "../img/values.svg";

export default function About() {
  return (
    <div className="about-box">
      <div className="about" id="about">
        <h1 class="text-center fw-bolder mt-5">About us</h1>
        <div className="about-flex d-flex justify-content-center  p-4">
          <div className="container container1 float-start">
            <h1 class="  fw-bolder mb-5">Umatter</h1>
            <p class="me-5">
              The students need different kinds of care at different times.
              Umatter can provide comprehensive care through our integrated
              digital platform. Umatter partners with the Guidance Services and
              Training Center of the University of San Agustin and the GSTC Peer
              Facilitators to provide relevant and timely mental health support.
            </p>
            <p class="me-5">
              Established on the year 2021 with Special thanks to our creators
              Christian Dave Montalban, Fredick Andrew Dimo, Marlou Amada, and
              Marc Jofer Dimacutac who paved the way for our students to have
              access with our University's Guidance Services and Training Center
              staffs' online services.
            </p>
            <p class="me-5">
              {" "}
              Our services are founded on the principles of education. Support
              and insights that allow students to effectively address mental
              health issues in the University and at their homes during this
              time of the Pandemic; to build resilience among them and increase
              productivity.
            </p>{" "}
          </div>
        </div>

        <div className="About-boxes">
          <div className="container d-flex justify-content-center ">
            <div class="card border-0 m-5">
              <img class="m-3" src={mission} alt="mission" />
              <div class="card-body">
                <h4 class="card-title">Mission</h4>
                <p class="card-text">
                  Our mission is to Lower the stigma surrounding mental health
                  by increasing the mental health knowledge of our students and
                  staff through exclusive chat support with the university's
                  Peer Facilitators and appointment sessions with our licensed
                  professionals.
                </p>
              </div>
            </div>
            <div class="card border-0 m-5">
              <img class="m-3" src={vision} alt="vision" />
              <div class="card-body">
                <h4 class="card-title">Vision</h4>
                <p class="card-text">
                  We hope to be a part of a future that the mental health
                  advocacy aims to create, one of which has significant
                  improvements in the state of mental well-being for our
                  students.
                </p>
              </div>
            </div>
            <div class="card border-0 m-5">
              <img class="m-3" src={values} alt="values" />
              <div class="card-body">
                <h4 class="card-title">Values</h4>
                <p class="card-text">
                  Our Values are the set of core beliefs that influence our
                  behaviors and conducts: Commitment, Compassion, and
                  Camaraderie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
