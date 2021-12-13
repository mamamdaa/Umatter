import React from "react";

export default function LandingNavbar() {
  return (
    <nav class="navbar  navbar-expand-xl fixed-top navbar-light bg-light border-bottom ">
      <div class="container-fluid ">
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
          <ul class="nav navbar-nav ms-auto">
            <li class="nav-item">About</li>
            <li class="nav-item">Events</li>
            <li class="nav-item">Project</li>
            <li class="nav-item">Team</li>
            <li class="nav-item register">Register</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
