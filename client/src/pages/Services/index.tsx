import React from "react";

import { Route, Switch } from "react-router-dom";
import ServicesList from "./components/ServicesList";
import CategoryList from "./components/Category";
const Services = () => {
  return (
    <Switch>
      <Route exact path="/services">
        <ServicesList />
      </Route>
      <Route path="/services/category">
        <CategoryList />
      </Route>
    </Switch>
  );
};

export default Services;
