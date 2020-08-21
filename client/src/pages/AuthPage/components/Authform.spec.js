import React from "react";
import AuthForm from "./Authform";

const setUp = (props) => shallow(<AuthForm {...props} />);

describe("all tests AuthForm", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  describe("AuthForm component", () => {
    it("should render AuthForm component", () => {
      expect(component).toMatchSnapshot();
    });
  });
});
