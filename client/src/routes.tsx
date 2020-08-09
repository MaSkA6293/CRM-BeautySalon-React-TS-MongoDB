import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Test from "./components/Test";
import { AuthPage } from "./pages/AuthPage";
const Home = lazy(() => import("./components/Home"));
const Clients = lazy(() => import("./pages/Clients"));
const Services = lazy(() => import("./pages/Services"));

// import Home from "./components/Home";
// import Clients from "./pages/Clients";
// import Services from "./pages/Services";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/Home">
          <Home />
        </Route>
        <Route path="/services">
          <Services />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="*">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/">
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
};
