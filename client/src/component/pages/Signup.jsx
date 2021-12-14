import React from "react";
import "./css/signup.css";
import exit from "../img/exit.svg";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="Singup-box">
      <div className="Signup ">
        <div className="Signup-container ">
          <div class="wrapper-flex d-flex justify-content-center">
            <div class="container">
              <ul class="navbar-nav  ">
                <li class="me-4">
                  <Link to="/" class="exit nav-link float-start">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={exit} alt="exit" />
                  </Link>
                </li>
              </ul>
              <h1 class=" fw-bolder text-center mt-2">Sign up to Blank</h1>

              <form>
                <div class="mb-3 ">
                  <label for="exampleInputEmail1" class="form-label fw-bolder">
                    Name
                  </label>
                  <input
                    type="email"
                    class="form-control rounded-pill"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputPassword1"
                    class="form-label fw-bolder"
                  >
                    Email
                  </label>
                  <input
                    type="Email"
                    class="form-control rounded-pill"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputPassword1"
                    class="form-label fw-bolder"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control rounded-pill"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Terms and condition
                  </label>
                </div>

                <div class="sign-up d-grid gap-2 mt-5">
                  <button class="btn rounded-pill" type="button">
                    Create account
                  </button>
                  <button
                    class="btn btn2  border border-dark rounded-pill"
                    type="button"
                  >
                    Sign up with Google
                  </button>
                </div>
              </form>

              <div className="sign-in d-flex justify-content-center">
                {" "}
                <span class="sign-in-container ms-sm-5">
                  <a>Already have an account?</a>
                  <Link to="/Login">
                    <a
                      class="btn btn-light m-4 rounded-pill "
                      href="#"
                      role="button"
                    >
                      Sign in
                    </a>
                  </Link>
                </span>
              </div>
            </div>

            <div class="container con1 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* */
}
