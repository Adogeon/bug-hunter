import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, LogIn, SignUp } from "./components/pages";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <div>Login Page</div>
          <LogIn />
        </Route>
        <Route exact path="/signup">
          <div>Sign Up </div>
          <SignUp />
        </Route>
        <Route exact path="/">
          <div>Homepage</div>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
