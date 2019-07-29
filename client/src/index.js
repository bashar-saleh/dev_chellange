import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App/App";
import NotFound from "./NotFound/NotFound";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";
import Logout from "./Logout/Logout";
import NonLoggedInRouter from "./NonLoggedInRouter";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <NonLoggedInRouter path="/login" comp={Login} />
        <NonLoggedInRouter path="/sign-up" comp={Signup} />
        <Route exact path="/logout" component={Logout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
