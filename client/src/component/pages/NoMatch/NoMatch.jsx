import React from "react";
import notFound from "../../img/404.svg";
import "./nomatch.css";
import { useLocation, Link } from "react-router-dom";

const NoMatch = () => {
    //should pas previous page loc to this page
  let location = useLocation();
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <img src={notFound} className="not-found" alt="404" />
        <p className="text-center">
          No match for <code>{location.pathname}</code>
        </p>
        <Link to="/" class="text-center nav-link fw-light d-flex justify-content-center">
          <p className="d-inline">Back</p>
          <span className="d-inline material-icons "> arrow_back</span>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
