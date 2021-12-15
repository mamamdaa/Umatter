import React,{useEffect} from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useQuery,gql } from "@apollo/client";
import {useSelector,useDispatch} from "react-redux";
import {userLogout} from "../../redux/user"
import {Button} from "react-bootstrap";
 


export default function LandingNavbar() {
  const {isLoggedIn, user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log("navbar",user);
  console.log("navbar",isLoggedIn);
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
            {!isLoggedIn ? (
              <li class="nav-item me-5 comp">
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
            </li>
            
            ) : (
              <li class="nav-item me-5 comp">
            <li class="nav-item">
              <Link to="/Profile" class="nav-link">
                Welcome {user.first_name}
              </Link>
            </li>
            <li class="nav-item">
            <Button variant="outline-primary" onClick={()=>dispatch(userLogout())}>Logout</Button>{' '}
            </li>
            </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
