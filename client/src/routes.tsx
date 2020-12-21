import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Test from "./components/Test";

import { AuthPage } from "./pages/AuthPage";
import MCalendar from "./pages/CalendarPage";

const Home = lazy(() => import("./pages/HomePage"));
const Clients = lazy(() => import("./pages/Clients"));
const Services = lazy(() => import("./pages/ServicesPage"));

export const useRoutes = (isAuthenticated: boolean): React.ReactElement => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/services">
                    <Services />
                </Route>
                <Route path="/clients">
                    <Clients />
                </Route>
                <Route path="/calendar">
                    <MCalendar />
                </Route>

                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route exact path="/">
                <AuthPage variant />
            </Route>
            <Route path="/signUp">
                <AuthPage signUp />
            </Route>
            <Route path="/signIn">
                <AuthPage signIn />
            </Route>
            <Route path="/test">
                <Test isOpen status={"error"} message={"Everything is OK!"} />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};
