import React, {useEffect} from "react";
import "./css/login.css";
import exit from "../img/exit.svg";
import { Link } from "react-router-dom";
import {LOGIN} from "../../graphql/Queries";
import { useMutation, useQuery,gql } from "@apollo/client";
import { useHistory } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {userLogin} from "../../redux/user"

export default function Login() {
  const {isLoggedIn} = useSelector(state => state.user);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataError, setDataError] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [login,{error, data }] = useMutation(LOGIN,
    { onError: (err) => {setDataError(JSON.parse(JSON.stringify(err)).networkError.result.errors[0])},}); //refactor

  const submitHandler = async (e) => {
    e.preventDefault();
    login({
      variables: {
        email: email,
        password: password,
      }
    })
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login));
      dispatch(userLogin(data.login));
      console.log(data.login);
    }
  }, [data,error,dispatch]);

  useEffect(() => {
    if(isLoggedIn){
        history.push('/');
    }
}, [history, isLoggedIn]);
  console.log(isLoggedIn);
  return (
    <div className="Login-box">
      <div className="Login ">
        <div className="Login-container ">
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
              {dataError && <p>{dataError.message}</p>}
              <form onSubmit={submitHandler}>
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
                    class="form-control rounded-pill"
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

                <div class="sign-in d-grid gap-2 mt-5">
                  <button class="btn rounded-pill" type="submit" >
                    Sign in
                  </button>
                  <button
                    class="btn btn2  border border-dark rounded-pill"
                    type="button"
                  >
                    Sign in with Google
                  </button>
                </div>
              </form>

              <div className="sign-up d-flex justify-content-center">
                {" "}
                <span class="sign-up-container ms-sm-5">
                  <a>Not a member?</a>
                  <Link to="/Signup">
                    <a
                      class="btn btn-light m-4 rounded-pill "
                      href="#"
                      role="button"
                    >
                      Sign up
                    </a>
                  </Link>
                </span>
              </div>
            </div>

            <div class="container con2 ">adsa</div>
          </div>
        </div>
      </div>
    </div>
  );
}
