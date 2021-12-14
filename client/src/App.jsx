import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingNavbar from "./component/inc/Navbar.jsx";
import About from "./component/pages/About.jsx";
import Home from "./component/pages/Home.jsx";
import Testimonials from "./component/pages/Testimonials";
import Contact from "./component/pages/Contact";
import Signup from "./component/pages/Signup.jsx";
import Login from "./component/pages/Login";
import ScrollToTop from "./component/inc/ScrollTop.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Login" component={Login} />
        <div className="navs">
          <LandingNavbar />
          <Route exact path="/" component={Home}></Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
