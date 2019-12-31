import React from "react";
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
        <Route path="/">
          <div>Homepage</div>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
