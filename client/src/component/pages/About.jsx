import React from "react";
import "./css/about.css";

export default function About() {
  return (
    <div className="about-box">
      <div className="about" id="about">
        <h1 class="text-center fw-bolder">About us</h1>
        <div className="about-flex d-flex justify-content-center mt-5 p-4">
          <div className="container container1">
            <h1 class="ms-5 text-center fw-bolder">Umatter</h1>
          </div>
          <div className="container container2 me-5">
            {" "}
            <p>
              The students need different kinds of care at different times.
              Umatter can provide comprehensive care through our integrated
              digital platform. Umatter partners with the Guidance Services and
              Training Center of the University of San Agustin and the GSTC Peer
              Facilitators to provide relevant and timely mental health support.
            </p>
            <p>
              Established on the year 2021 with Special thanks to our creators
              Christian Dave Montalban, Fredick Andrew Dimo, Marlou Amada, and
              Marc Jofer Dimacutac who paved the way for our students to have
              access with our University's Guidance Services and Training Center
              staffs' online services.
            </p>
            <p>
              {" "}
              Our services are founded on the principles of education. Support
              and insights that allow students to effectively address mental
              health issues in the University and at their homes during this
              time of the Pandemic; to build resilience among them and increase
              productivity.
            </p>{" "}
          </div>
        </div>
        <div className="about-flex d-flex justify-content-center mt-5 p-4">
          <div className="container ">asd</div>
          <div className="container">asd</div>
          <div className="container">ad</div>
        </div>
      </div>
    </div>
  );
}
