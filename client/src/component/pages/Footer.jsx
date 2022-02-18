import React from "react";
import "./css/footer.css";
import { HashLink as Link } from "react-router-hash-link";
import facebook from "../img/facebook.svg";
import instagram from "../img/instagram.svg";
import linkedine from "../img/linkedine.svg";
import location from "../img/location.svg";
import phone from "../img/phone.svg";
import email from "../img/email.svg";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer pt-sm-5" id="footer">
        <div className="container d-flex justify-content-center ">
          <div class="card border-0 m-5">
            <div class="card-body">
              <h4 class="card-title">Umatter</h4>
              <p class="card-text">
                Uncover insights on students' stressors through organizational
                surveys and monthly reports to help design effective approaches
                and strategies.
              </p>
            </div>
          </div>
          <div class="card border-0 m-5">
            <div class="card-body">
              <h4 class="card-title">Social Links</h4>
              <a href="">
                <div class="facebook mt-3">
                  <img src={facebook} alt="facebook" />
                  <span class="ms-4">Facebook</span>
                </div>
              </a>
              <a href="">
                <div class="instagram mt-3">
                  <img src={instagram} alt="instagram" />
                  <span class="ms-4">Instagram</span>
                </div>
              </a>
              <a href="">
                {" "}
                <div class="linkdine mt-3">
                  <img src={linkedine} alt="linkedine" />
                  <span class="ms-4">Linkedine</span>
                </div>
              </a>
            </div>
          </div>
          <div class="card border-0 m-5">
            <div class="card-body quick">
              <h4 class="card-title">Quick links</h4>
              <div class="mt-3">
                {" "}
                <Link smooth to="#home">
                  Home
                </Link>
              </div>
              <div class="mt-3">
                {" "}
                <Link smooth to="#about">
                  About
                </Link>
              </div>
              <div class="mt-3">
                {" "}
                <Link smooth to="#contact">
                  Contact
                </Link>
              </div>

              <div class="mt-3">
                {" "}
                <Link smooth to="#vlogs">
                  Vlogs
                </Link>
              </div>
            </div>
          </div>
          <div class="card info border-0 m-5">
            <div class="card-body">
              <h4 class="card-title">Contact Info</h4>
              <a href="">
                <div class="facebook mt-3">
                  <img src={location} alt="location" />
                  <span class="ms-4">Iloilo City, Philippines</span>
                </div>
              </a>
              <a href="">
                <div class="instagram mt-3">
                  <img src={phone} alt="phone" />
                  <span class="ms-4">09123456789</span>
                </div>
              </a>
              <a href="">
                {" "}
                <div class="linkdine mt-3">
                  <img src={email} alt="email" />
                  <span class="ms-4">umatter@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
