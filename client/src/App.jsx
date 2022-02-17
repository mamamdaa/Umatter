import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/inc/Navbar.jsx";
import About from "./component/pages/About.jsx";
import Home from "./component/pages/Home.jsx";
import Works from "./component/pages/Works.jsx";
import Testimonials from "./component/pages/Testimonials";
import Contact from "./component/pages/Contact";
import Signup from "./component/pages/Signup.jsx";
import Login from "./component/pages/Login";

import User from "./component/pages/User.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/User" component={User} />
        <div className="navs">
          <Navbar />
          <Home /> <Works />
          {/* <About />
          <Testimonials />
          <Contact /> */}
        </div>
      </Switch>
    </Router>
  );
}

export default App;
