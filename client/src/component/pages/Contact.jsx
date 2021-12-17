import "./css/contact.css";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Contact() {
  return (
    <div className="contact-box">
      <div className="contact" id="contact">
        <div class="Contact-flex d-flex justify-content-center p-4 ">
          <div className="container1"></div>
          <div className="contact-flex ">
            <h1 class=" fw-bolder text-center mt-1 mb-5">Connect with us</h1>
            <div className="container container2 border ">
              <form>
                <div class="mb-3 mt-4">
                  <label for="exampleInputEmail1" class="form-label fw-bolder">
                    Name
                  </label>
                  <input
                    type="email"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label fw-bolder">
                    Email
                  </label>
                  <input
                    type="Email"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label fw-bold"
                  >
                    Message
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>

                <div class="submit d-grid gap-2 mt-5">
                  <Link to="/User">
                    <button
                      class="btn create-btn fw-bold border border-dark"
                      type="button"
                    >
                      Submit
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
