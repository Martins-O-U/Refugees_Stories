import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({component: Component, ...props}) => {
  return (
    <Route
      {...props}
      render={props => localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
  
};

export default PrivateRoute;