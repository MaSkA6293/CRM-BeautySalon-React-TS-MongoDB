import React from "react";
import Navitem from "./index";

const setUp = (props) => shallow(<Navitem {...props} />);

describe("all tests Navitem", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  describe("Navitem component", () => {
    it("should render Navitem component", () => {
      expect(component).toMatchSnapshot();
    });
  });
});
