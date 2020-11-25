import React from "react";
import Header from ".";

const setUp = (properties) => shallow(<Header {...properties} />);

describe("all tests Home", () => {
    let component;
    beforeEach(() => {
        component = setUp();
    });
    describe("Home component", () => {
        it("should render Home component", () => {
            expect(component).toMatchSnapshot();
        });
    });
});
