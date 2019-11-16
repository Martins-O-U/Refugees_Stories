import React from "react";
import PrivateRoute from './PrivateRoute';
import DashboardLayout from "../Layout/DashboardLayout";


const DashboardRouter = () => (

    <PrivateRoute path="/dashboard" component={DashboardLayout} />

)

export default DashboardRouter;