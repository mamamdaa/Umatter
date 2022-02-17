import React, { useEffect } from "react";
import "./css/signup.css";
import exit from "../img/exit.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { REGISTER } from "../../graphql/Mutations";

export default function Signup() {
  const [dataError, setDataError] = React.useState("");
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [register, { error, data }] = useMutation(REGISTER, {
    onError: (err) => {},
  }); //refactor

  const submitHandler = async (e) => {
    e.preventDefault();
    register({
      variables: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      },
    });
  };
  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const newError = JSON.parse(JSON.stringify(error));
      setDataError(newError.message);
    }
  }, [error]);
  return (
    <div className="Singup-box">
      <div className="Signup">
        <div class="Signup-flex d-flex justify-content-center p-4 m-0">
          {" "}
          <img
            class=" bg ms-5 w-100 h-100"
            src={background2}
            alt="background2"
          />
          <div className=" col-sm-8 mt-5 Form-flex ">
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
              {dataError && <p className="error">{dataError}</p>}
              <form onSubmit={submitHandler}>
                <div class="mb-3 ">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fw-bolder fs-6"
                  >
                    First Name
                  </label>
                  <input
                    type="string"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div class="mb-3 ">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fw-bolder fs-6"
                  >
                    Last Name
                  </label>
                  <input
                    type="string"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fw-bolder fs-6"
                  >
                    Email
                  </label>
                  <input
                    type="Email"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputPassword1"
                    class="form-label fw-bolder fs-6"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
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
                <span class="sign-in-container mt-3 text-center">
                  <a>Already have an account?</a>
                  <Link to="/Login">
                    <a class="btn btn btn-light  " role="button">
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
