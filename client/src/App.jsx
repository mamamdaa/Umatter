import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/inc/Navbar.jsx";
import Footer from "./component/pages/Footer.jsx";
import About from "./component/pages/About.jsx";
import Home from "./component/pages/Home.jsx";
import Works from "./component/pages/Works.jsx";
import Testimonials from "./component/pages/Testimonials";
import Contact from "./component/pages/Contact";
import Signup from "./component/pages/Signup.jsx";
import Login from "./component/pages/Login";
import Connect from "./component/pages/Connect/Connect.jsx";
import User from "./component/pages/User.jsx";
import Facilitators from "./component/pages/Facilitators.jsx";
import Dashboard from "./component/pages/Dashboard.jsx";
import store from "./redux/store";
import { connect, Provider } from "react-redux";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectRoute from "./component/ProtectRoute.jsx";
import NoMatch from "./component/pages/NoMatch/NoMatch.jsx";
import Verification from "./component/pages/Verification/Verification.jsx";
import RegisterVerification from "./component/pages/RegisterVerification/RegisterVerification.jsx";

const baseLink = process.env.REACT_APP_API_URL;
const environment = process.env.NODE_ENV;
console.log("baseLink", baseLink);
const websocketURI =
  environment === "development"
    ? "ws://localhost:5000/graphql"
    : "wss://" + baseLink + "/graphql";
const httpURI =
  environment === "development"
    ? "http://localhost:5000/graphql"
    : "https://" + baseLink + "/graphql";
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    alert(`Network error ${networkError}`);
  }
});

const wsLink = new WebSocketLink({
  uri: websocketURI,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,

  new HttpLink({ uri: httpURI }),
  errorLink
);

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://localhost:5000/graphql" }),
// ]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="navs">
                <Navbar />
                <Home />
                <Works />
                <About />
                <Facilitators />
                <Testimonials />
                <Contact />
              </div>
            </Route>
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/User" component={User} />
            <Route exact path="/Verification" component={Verification} />
            <Route exact path="/Verification/:token" component={Verification} />
            <Route exact path="/RegisterVerification" component={RegisterVerification} />
            <ProtectRoute exact path="/Connect" component={Connect} />
            <ProtectRoute exact path="/Dashboard" component={Dashboard} />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
