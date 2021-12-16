import React from "react";
import "./css/signup.css";
import exit from "../img/exit.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="Singup-box">
      <div className="Signup">
        <div class="Signup-flex d-flex justify-content-center p-4 ">
          <div className="container">
            {" "}
            <img class="ms-5 bg" src={background2} alt="background2" />
          </div>

          <div className="Form-flex ">
            <div className="container border">
              <ul class="navbar-nav  ">
                <li>
                  <Link to="/" class="exit nav-link float-start">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={exit} alt="exit" />
                  </Link>
                </li>
              </ul>
              <h1 class=" fw-bolder text-center">Sign up</h1>
              <div class="sign-up d-grid gap-2 mt-4">
                <button class="btn btn2  border  " type="button">
                  Sign up with Google
                </button>
                <p class="text-center mt-3 mb-3 fw-bold">or</p>
              </div>
              <form>
                <div class="mb-3 ">
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
                    for="exampleInputPassword1"
                    class="form-label fw-bolder"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control fw-bold border border-dark"
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
                  <Link to="/User">
                    <button
                      class="btn create-btn fw-bold border border-dark"
                      type="button"
                    >
                      Create account
                    </button>
                  </Link>
                </div>
              </form>
              <div className="sign-in d-flex justify-content-center">
                {" "}
                <span class="sign-in-container ms-sm-5">
                  <a>Already have an account?</a>
                  <Link to="/Login">
                    <a class="btn btn btn-light m-4 " role="button">
                      Sign in
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*    */
}
