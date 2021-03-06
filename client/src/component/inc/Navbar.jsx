import React, { useEffect, useState } from "react";
import "./navbar.css";

import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { clientLogoutReducer } from "../../redux/client";
import { HashLink as Link } from "react-router-hash-link";
import { Button } from "react-bootstrap";
import "./UserNavbar.css";
import dropdown from "../img/dropdown.svg";
import profile from "../img/profile.svg";

export default function Navbar() {
  const { isLoggedIn, client, role } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  //navbar background
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <nav
      className={
        color
          ? "navbar navbar-bg active navbar-expand-xl fixed-top navbar-light"
          : "navbar active navbar-expand-xl fixed-top navbar-light"
      }
    >
      <div class="container-fluid ">
        <a href="/" class="logo ms-5  fw-bolder">
          UMATTER
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-bg-bg m-0 navbar-collapse me-5"
          id="navbarNavDropdown"
        >
          <ul class="nav navbar-nav m-3 ms-auto">
            <li class="nav-item me-4">
              <Link smooth to="/#home" class="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link smooth to="/#about" class="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item me-4 ">
              <Link smooth to="/#facilitators" class="nav-link">
                Facilitators
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link smooth to="/#testimonials" class="nav-link">
                Testimonials
              </Link>
            </li>
            <li class="nav-item me-5 pe-5 ">
              <Link smooth to="/#contact" class="nav-link">
                Contact
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                {role === "facilitator" ? (
                  <li class="nav-item me-5 comp">
                    <Link smooth to="/dashboard" class="nav-link">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li class="nav-item me-5 comp">
                    <Link smooth to="/connect" class="nav-link">
                      Connect
                    </Link>
                  </li>
                )}
              </>
            ) : null}
            {!isLoggedIn ? (
              <>
                <li class="nav-item">
                  <Link smooth to="/Login" class="nav-link">
                    Log in
                  </Link>
                </li>
                <li class="nav-item">
                  <Link smooth to="/Signup" class="nav-link btn-dark">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* <li class="nav-item">
                  <Link to="/Profile" class="nav-link">
                    Welcome {client.first_name}
                  </Link>
                </li>
                <li class="nav-item">
                  <Button
                    variant="outline-primary"
                    onClick={() => dispatch(clientLogoutReducer())}
                  >
                    Logout
                  </Button>{" "}
                </li> */}
                {/* <li class="nav-item me-5 comp">
                  <Link smooth to="/User" class="nav-link">
                    Chat
                  </Link>
                </li> */}
                <li>
                  <div class="dropdown me-5">
                    <img src={profile} alt="profile" />
                    Welcome {client.first_name}
                    <button
                      class="btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={dropdown} alt="dropdown" />
                    </button>
                    <ul
                      class="dropdown-menu p-2"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li class="border-bottom">
                        <a class="dropdown-item client-name" href="#">
                          <img
                            class="client-profile me-2"
                            src={profile}
                            alt="profile"
                          />
                          {client.first_name}
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item mt-2" href="#">
                          Edit Profile
                        </a>
                      </li>
                      <li class="border-bottom">
                        <a class="dropdown-item" href="#">
                          Account setting
                        </a>
                      </li>
                      <li>
                        <Link to="/">
                          <a
                            class="dropdown-item"
                            href=""
                            onClick={() => dispatch(clientLogoutReducer())}
                          >
                            Sign out
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}

            {/* <li class="nav-item">
              <Link smooth to="/Login" class="nav-link">
                Log in
              </Link>
            </li>
            <li class="nav-item">
              <Link smooth to="/Signup" class="nav-link btn-dark">
                Sign up
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
