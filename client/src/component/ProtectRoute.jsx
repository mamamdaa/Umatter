import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectRoute = (props) => {
  const { isLoggedIn } = useSelector((state) => state.client);
  console.log("isLoggedIn", isLoggedIn);
  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;

};

export default ProtectRoute;
