import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
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
        <span class="logo ms-5  fw-bolder">UMMATER</span>
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
        <div class="collapse navbar-collapse me-5" id="navbarNavDropdown">
          <ul class="nav navbar-nav m-3 ms-auto">
            <li class="nav-item me-4">
              <Link to="/" class="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link to="/About" class="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link to="/Testimonials" class="nav-link">
                Testimonials
              </Link>
            </li>
            <li class="nav-item me-5 comp">
              <Link to="/Contact" class="nav-link">
                Contact
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Login" class="nav-link">
                Log in
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Signup" class="nav-link btn-dark">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
