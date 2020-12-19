import React from "react";
import HomePage from "./index";
import { Provider } from "react-redux";
import store from "../../store";

import { BrowserRouter as Router } from "react-router-dom";
const setUp = (props) =>
    render(
        <Provider store={store}>
            <Router>
                <HomePage {...props} />
            </Router>
        </Provider>,
    );

describe("all tests HomePage", () => {
    let component;
    beforeEach(() => {
        component = setUp();
    });
    describe("HomePage component", () => {
        it("should render HomePage component", () => {
            expect(component).toMatchSnapshot();
        });
    });
});
