import React, { useEffect } from "react";
import "./css/login.css";
import exit from "../img/exit.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";
import { LOGIN } from "../../graphql/Queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/user";

export default function Login() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataError, setDataError] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, { error, data }] = useMutation(LOGIN, {
    onError: (err) => {},
  }); //refactor

  const submitHandler = async (e) => {
    e.preventDefault();
    login({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (error) {
      const newError = JSON.parse(JSON.stringify(error));
      setDataError(newError.message);
    }
  }, [error]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login));
      dispatch(userLogin(data.login));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/User");
    }
  }, [history, isLoggedIn]);

  return (
    <div className="Login-box " id="home">
      <div className="Login ">
        <div class="Login-flex d-flex justify-content-center text-center text-lg-start ">
          <div class="container-fluid container1 col-lg-8  mt-md-3">
            <div class="row">
              <div class="login-container rounded col-lg-5 mb-5">
                <form onSubmit={submitHandler}>
                  <ul class="navbar-nav  ">
                    <li>
                      <Link to="/" class="exit nav-link float-start">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={exit} alt="exit" />
                      </Link>
                    </li>
                  </ul>
                  <h1 class=" fw-bolder text-center">Sign in</h1>
                  <div class="sign-in d-grid gap-2 mt-4">
                    <button class="btn btn2  border  " type="button">
                      Sign in with Google
                    </button>
                    <p class="text-center mt-3 mb-3 fw-bold">or</p>
                  </div>
                  {dataError && <p>{dataError}</p>}
                  <div class="mb-3">
                    <label
                      for="exampleInputEmail1"
                      class="form-label fw-bolder"
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
                      class="form-label fw-bolder"
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
                      class="btn sign-btn fw-bold border border-dark mb-3"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="sign-up d-flex justify-content-center">
                  {" "}
                  <span class="sign-up-container text-center mt-3">
                    <a>Not a member?</a>
                    <Link to="/Signup">
                      <a class="btn btn-light " role="button">
                        Sign up
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
