import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import CreateAcount from "./pages/CreateAcount";
import Timeline from "./pages/TimeLine";
import CreateDelivery from "./pages/CreateDelivery";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact/>
            <Route component={CreateAcount} path="/add-acount" />
            <Route component={CreateDelivery} path="/add-delivery" />
            <Route component={Timeline} path="/timeline" />
        </BrowserRouter>
    );
}

export default Routes;