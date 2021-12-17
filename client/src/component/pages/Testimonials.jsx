import React from "react";
import "./css/testimonials.css";
import mission from "../img/mission.svg";

export default function Testimonials() {
  return (
    <div className="testimonials-box" id="testimonials">
      <div className="testimonials justify-content-center ">
        <h1 class="text-center fw-bolder">Testimonials</h1>
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="card mb-5 mt-5">
                <div class="card-body">
                  <div className="developer d-flex ">
                    <img class="m-3" src={mission} alt="mission" />
                    <div className="container2 name mt-3">
                      <h5 class="card-title">Christian Dave Montalban</h5>

                      <h6 class="card-subtitle mb-2 text-muted">
                        Iloilo City, Philippines
                      </h6>
                    </div>
                  </div>

                  <p class="card-text">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pulvinar eu iaculis risus in sagittis imperdiet. Vitae id
                    quis auctor lectus imperdiet morbi. Id odio amet at sed
                    turpis.”
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card mb-5 mt-5">
                <div class="card-body">
                  <div className="developer d-flex ">
                    <img class="m-3" src={mission} alt="mission" />
                    <div className="container2 name mt-3">
                      <h5 class="card-title">Fredick Andrew Dimo</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Iloilo City, Philippines
                      </h6>
                    </div>
                  </div>

                  <p class="card-text">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pulvinar eu iaculis risus in sagittis imperdiet. Vitae id
                    quis auctor lectus imperdiet morbi. Id odio amet at sed
                    turpis.”
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card mb-5 mt-5">
                <div class="card-body">
                  <div className="developer d-flex ">
                    <img class="m-3" src={mission} alt="mission" />
                    <div className="container2 name mt-3">
                      <h5 class="card-title">Marlou Amada</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Iloilo City, Philippines
                      </h6>
                    </div>
                  </div>

                  <p class="card-text">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pulvinar eu iaculis risus in sagittis imperdiet. Vitae id
                    quis auctor lectus imperdiet morbi. Id odio amet at sed
                    turpis.”
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="card mb-5 mt-5">
                <div class="card-body">
                  <div className="developer d-flex ">
                    <img class="m-3" src={mission} alt="mission" />
                    <div className="container2 name mt-3">
                      <h5 class="card-title">Marc Jofer Dimacutac</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Iloilo City, Philippines
                      </h6>
                    </div>
                  </div>

                  <p class="card-text">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pulvinar eu iaculis risus in sagittis imperdiet. Vitae id
                    quis auctor lectus imperdiet morbi. Id odio amet at sed
                    turpis.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
