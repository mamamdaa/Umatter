import React, { useEffect } from "react";
import "./css/signup.css";
import exit2 from "../img/exit2.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_REGISTER } from "../../graphql/Mutations";
import { toast } from "react-toastify";

export default function Signup() {
  const [dataError, setDataError] = React.useState("");
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [userRegister, { error: userRegisterError, data: userRegisterData }] =
    useMutation(USER_REGISTER, {
      onError: (err) => {},
    }); //refactor

  const submitHandler = async (e) => {
    e.preventDefault();
    userRegister({
      variables: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (userRegisterError) {
      const newError = JSON.parse(JSON.stringify(userRegisterError));
      setDataError(newError.message);
      toast.error(newError.message);
    } else if (userRegisterData) {
      toast.success("Successfully registered");
      history.push("/login");
    }
  }, [userRegisterData, userRegisterError]);

  useEffect(() => {}, [userRegisterError]);

  return (
    <div className="Signup-box " id="home">
      <ul class="navbar-nav text-center pt-5 ">
        <li>
          <Link to="/" class="exit nav-link float-sm-end me-sm-5 fw-light">
            Back to home page
            <img class="ms-3" src={exit2} alt="exit2" />
          </Link>
        </li>
      </ul>
      <div className="Signup ">
        <div class="Signup-flex d-flex justify-content-center text-center text-lg-start ">
          <div class="container-fluid container1 col-lg-8  mt-md-3">
            <div class="row p-sm-3">
              <div class="Signup-container rounded col-lg-5 mb-5 p-5">
                <h4 className="fw-light text-center">Welcome to Umatter !</h4>
                <h2 class=" fw-bolder text-center">Signup</h2>
                <div class="sign-in d-grid gap-2 mt-4">
                  <button class="btn btn1 fw-bold border  " type="button">
                    Signup with Google
                  </button>
                  <p class="text-center mt-3 mb-3 fw-bold">or</p>
                </div>
                {dataError && <p className="userRegisterError">{dataError}</p>}
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
                    <button type="submit" class="btn btn2 fw-bold border-0">
                      Create account
                    </button>
                  </div>
                </form>
                <div className=" d-flex justify-content-center">
                  {" "}
                  <span class=" mt-3 text-center ">
                    <a>Already have an account?</a>
                    <Link to="/Login">
                      <a
                        class="btn3 btn btn-light bg-transparent border-0 "
                        role="button"
                      >
                        Login
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
              <div class=" col-lg-6 ms-lg-5 mt-5 ">
                <img class="w-100 h-100" src={background2} alt="background2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="Singup-box">
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
              {dataError && <p className="userRegisterError">{dataError}</p>}
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
                  <Link to="/Signup">
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
    </div> */
}
