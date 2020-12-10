import React from "react";
import { Route, Switch } from "react-router-dom";
import ServicesPage from "./components/ServicesPage";
import CategoriesPage from "../Categories";

const Services: React.FC = (): React.ReactElement => {
    return (
        <Switch>
            <Route exact path="/services">
                <ServicesPage />
            </Route>
            <Route path="/services/categories">
                <CategoriesPage />
            </Route>
        </Switch>
    );
};

export default Services;
