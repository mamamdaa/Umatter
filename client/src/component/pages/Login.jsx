import React, { useEffect } from "react";
import "./css/login.css";
import exit2 from "../img/exit2.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";
import { USER_LOGIN } from "../../graphql/Mutations";
import { FACILITATOR_LOGIN } from "../../graphql/Queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clientLoginReducer } from "../../redux/client";
import { facilitatorLoginReducer } from "../../redux/facilitator";
import { toast } from "react-toastify";

export default function Login() {
  const { isLoggedIn } = useSelector((state) => state.client);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataError, setDataError] = React.useState("");
  const [isFacilitator, setIsFacilitator] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const [userLogin, { error: userLoginError, data: userLoginData }] =
    useMutation(USER_LOGIN, {
      onError: (err) => {},
    }); //refactor

  const [facilitatorLogin, { error: facilitatorError, data: facilitatorData }] =
    useMutation(FACILITATOR_LOGIN, {
      onError: (err) => {},
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isFacilitator) {
      facilitatorLogin({
        variables: {
          email,
          password,
        },
      });
    } else {
      userLogin({
        variables: {
          email: email,
          password: password,
        },
      });
    }
  };
  //refactor
  useEffect(() => {
    if (facilitatorError) {
      const errorMessage = JSON.parse(JSON.stringify(facilitatorError.message));
      toast.error(errorMessage);
      setDataError(errorMessage);
    } else if (facilitatorData) {
      localStorage.setItem("token", facilitatorData.loginFacilitator.token);
      localStorage.setItem(
        "client",
        JSON.stringify(facilitatorData.loginFacilitator)
      );
      localStorage.setItem("role", facilitatorData.loginFacilitator.role);
      dispatch(clientLoginReducer(facilitatorData.loginFacilitator));
    }
  }, [facilitatorData, facilitatorError, dispatch]);

  useEffect(() => {
    if (userLoginError) {
      const errorMessage = JSON.parse(JSON.stringify(userLoginError.message));
      toast.error(errorMessage);
      setDataError(errorMessage);
    }
    if (userLoginData) {
      let userData = userLoginData.userLogin
      localStorage.setItem("token", userData.token);
      localStorage.setItem("client", JSON.stringify(userLoginData.userLogin));
      localStorage.setItem("role", userData.role);
      dispatch(clientLoginReducer(userData));
    }
  }, [userLoginData, userLoginError, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  return (
    <div className="Login-box " id="home">
      <ul class="navbar-nav text-center pt-5 ">
        <li>
          <Link to="/" class="exit nav-link float-sm-end me-sm-5 fw-light">
            Back to home page
            <img class="ms-3" src={exit2} alt="exit2" />
          </Link>
        </li>
      </ul>
      <div className="Login ">
        <div class="Login-flex d-flex justify-content-center text-center text-lg-start ">
          <div class="container-fluid container1 col-lg-8  mt-md-3">
            <div class="row p-sm-3">
              <div class="login-container rounded col-lg-5 mb-5">
                <form class="p-4" onSubmit={submitHandler}>
                  <h4 className="fw-light text-center">Welcome to Umatter !</h4>
                  <h2 class=" fw-bolder text-center">Login</h2>
                  <div class="sign-in d-grid gap-2 mt-4">
                    <button class="btn btn1  border  " type="button">
                      Login with Google
                    </button>
                    <p class="text-center mt-3 mb-3 fw-bold">or</p>
                  </div>
                  {dataError && <p>{dataError}</p>}
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
                  <div class="forgot mb-3 text-center">
                    <a href="#" class="link-dark">
                      Forgot Password?
                    </a>
                  </div>

                  <div class="sign-in d-grid gap-2 mt-5">
                    <button
                      class="btn sign-btn fw-bold border border-dark"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onChange={() => setIsFacilitator(!isFacilitator)}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Login as Facilitator
                    </label>
                  </div>
                  <div className=" d-flex justify-content-center">
                  {" "}
                  <span class=" mt-3 text-center ">
                    <a>Not a member?</a>
                    <Link to="/Signup">
                      <a
                        class="btn3 btn btn-light bg-transparent border-0 "
                        role="button"
                      >
                        Signup
                      </a>
                    </Link>
                  </span>
                </div>
                </form>
              </div>
              <div class=" col-lg-6 ms-lg-5 mt-5 ">
                <img class="w-100 h-100" src={background2} alt="background2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="Login-box">
    //   <div className="Login">
    //     <div class="Login-flex d-flex justify-content-center p-4 m-0">
    //       {" "}
    //       <img
    //         class=" bg ms-5 w-100 h-100"
    //         src={background2}
    //         alt="background2"
    //       />
    //       <div className="col-sm-8 mt-5 Form-flex ">
    //         <div className="container border">
    // <ul class="navbar-nav  ">
    //   <li>
    //     <Link to="/" class="exit nav-link float-start">
    //       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //       <img src={exit} alt="exit" />
    //     </Link>
    //   </li>
    // </ul>
    // <h1 class=" fw-bolder text-center">Sign in</h1>
    // <div class="sign-in d-grid gap-2 mt-4">
    //   <button class="btn btn2  border  " type="button">
    //     Sign in with Google
    //   </button>
    //   <p class="text-center mt-3 mb-3 fw-bold">or</p>
    // </div>
    // {dataError && <p>{dataError}</p>}
    // <form onSubmit={submitHandler}>
    //   <div class="mb-3">
    //     <label for="exampleInputEmail1" class="form-label fw-bolder">
    //       Email
    //     </label>
    //     <input
    //       type="Email"
    //       class="form-control fw-bold border border-dark"
    //       id="exampleInputEmail1"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div class="mb-3">
    //     <label
    //       for="exampleInputPassword1"
    //       class="form-label fw-bolder"
    //     >
    //       Password
    //     </label>
    //     <input
    //       type="password"
    //       class="form-control fw-bold border border-dark"
    //       id="exampleInputPassword1"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <div class="forgot mb-3 text-center">
    //     <a href="#" class="link-dark">
    //       Forgot Password?
    //     </a>
    //   </div>

    //   <div class="sign-in d-grid gap-2 mt-5">
    //     <button
    //       class="btn sign-btn fw-bold border border-dark"
    //       type="submit"
    //     >
    //       Sign in
    //     </button>
    //   </div>
    // </form>
    //           <div className="sign-up d-flex justify-content-center">
    //             {" "}
    //             <span class="sign-up-container text-center mt-3">
    //               <a>Not a member?</a>
    //               <Link to="/Signup">
    //                 <a class="btn btn-light " role="button">
    //                   Sign up
    //                 </a>
    //               </Link>
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
