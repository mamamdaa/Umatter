import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingNavbar from "./component/inc/Navbar.jsx";
import About from "./component/pages/About.jsx";
import Home from "./component/pages/Home.jsx";
import Testimonials from "./component/pages/Testimonials";
import Contact from "./component/pages/Contact";
import Signup from "./component/pages/Signup.jsx";
import Login from "./component/pages/Login";
import store from "./redux/store";
import {Provider} from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  gql,
} from "@apollo/client";
import ScrollToTop from "./component/inc/ScrollTop.jsx";
import { onError } from "@apollo/client/link/error";

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

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  headers: {
    authorization: localStorage.getItem("token") || ""
  },
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Login" component={Login} />
            <div className="navs">
              <LandingNavbar />
              <Route exact path="/" component={Home}></Route>
            </div>
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
