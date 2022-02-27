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
                src={faciThree}
                alt="vision"
              />
              <div class="card-body ">
                <h4 class="card-title">Marc Jofer C. Dimacutac </h4>
                <p class="text-center">
                  BS Computer Engineering 
                </p>
                <p class="text-center">
                  If you're happy and you know it Clap your hands. Gemini,
                  multitalented, former sugar baby.
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
                <h4 class="card-title">Ma. Judea Paguntalan </h4>
                <p class="text-center">BS Psychology</p>
                <p class="text-center">
                  Enjoy and appreciate the tiny details of life. Dancer, artist,
                  reader, motocross "noob" rider and a professional stay at home
                  daughter.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-4 text-center mt-md-3">
            <div class="card border-2">
              <img
                class="align-self-center card-img-top"
                src={faciTwo}
                alt="vision"
              />
              <div class="card-body">
                <h4 class="card-title">Mary Charl M. Pamplona</h4>
                <p class="text-center">BS Psych 3A</p>
                <p class="text-center">
                  I'm not Sigmund Freud, and that's exactly why you can trust me
                  😌 Reader, writer, jedi, demigod.
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
