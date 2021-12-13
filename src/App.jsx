import "./App.css";
import LandingNavbar from "./component/inc/LandingNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="navs">
        <LandingNavbar />
      </div>
    </Router>
  );
}

export default App;
