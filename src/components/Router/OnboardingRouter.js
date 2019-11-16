import React from "react";
import { Route } from "react-router-dom";
import Login from "../../pages/Login";

const OnboardingRouter = () => (
    <Route path="/login" component={Login} />
);

export default OnboardingRouter