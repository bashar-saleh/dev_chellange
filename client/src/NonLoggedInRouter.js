import React from "react";
import { Route, Redirect } from "react-router-dom";

const NonLoggedInRouter = ({ path, comp }) => {
  const isLoggedIn = localStorage.getItem("access_token");
  const target = <Route to={path} component={comp} />;

  

  return <div>{isLoggedIn ? <Redirect to="/" /> : target}</div>;
};


export default NonLoggedInRouter;