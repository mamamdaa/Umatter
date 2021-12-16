import React, { useState } from "react";
import "./navbar.css";
import { HashLink as Link } from "react-router-hash-link";

//

export default function Navbar() {
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
          UMMATER
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
              <Link smooth to="#home" class="nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link smooth to="#about" class="nav-link">
                About
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link smooth to="/Testimonials" class="nav-link">
                Testimonials
              </Link>
            </li>
            <li class="nav-item me-5 comp">
              <Link smooth to="/Contact" class="nav-link">
                Contact
              </Link>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
