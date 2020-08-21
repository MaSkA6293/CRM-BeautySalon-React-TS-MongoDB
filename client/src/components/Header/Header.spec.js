import React from "react";
import Header from "./index";

const setUp = (props) => shallow(<Header {...props} />);

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
