import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogged = sessionStorage.getItem("token-item");

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};
export default PrivateRoute;
