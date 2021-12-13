import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav class="navbar  navbar-expand-xl fixed-top navbar-light  border-bottom ">
      <div class="container-fluid ">
        <span class="ms-5">LOGO</span>
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
