import React from "react";
import Label from "./index";

const setUp = (props) => shallow(<Label {...props} />);

describe("all tests Label", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  describe("Label component", () => {
    it("should render Label component", () => {
      expect(component).toMatchSnapshot();
    });
  });
});
