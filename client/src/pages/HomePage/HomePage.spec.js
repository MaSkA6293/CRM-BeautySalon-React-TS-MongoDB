import React from "react";
import HomePage from "./index";

const setUp = (props) => shallow(<HomePage {...props} />);

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
