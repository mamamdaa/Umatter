import React, { useEffect } from "react";
import "./css/login.css";
import exit from "../img/exit.svg";
import background2 from "../img/background2.svg";
import { Link } from "react-router-dom";
import { LOGIN } from "../../graphql/Queries";
import { useMutation} from "@apollo/client";
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
    onError: (err) => {
      setDataError(
        JSON.parse(JSON.stringify(err)).networkError.result.errors[0]
      );
    },
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
    if (data) {
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login));
      dispatch(userLogin(data.login));
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);
  return (
    <div className="Login-box">
      <div className="Login">
        <div class="Login-flex d-flex justify-content-center p-4 ">
          <div className="container">
            {" "}
            <img class="ms-5" src={background2} alt="background2" />
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
              <h1 class=" fw-bolder text-center">Sign in</h1>
              <div class="sign-in d-grid gap-2 mt-4">
                <button class="btn btn2  border  " type="button">
                  Sign in with Google
                </button>
                <p class="text-center mt-3 mb-3 fw-bold">or</p>
              </div>
              {dataError && <p>{dataError.message}</p>}
              <form onSubmit={submitHandler}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label fw-bolder">
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
                  
                  <Link to="/User">
                    <button
                      class="btn sign-btn fw-bold border border-dark"
                      type="button"
                    >
                      Sign in
                    </button>
                  </Link>
                </div>
              </form>
              <div className="sign-up d-flex justify-content-center">
                {" "}
                <span class="sign-up-container ms-sm-5">
                  <a>Not a member?</a>
                  <Link to="/Signup">
                    <a class="btn btn-light m-4 " role="button">
                      Sign up
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
