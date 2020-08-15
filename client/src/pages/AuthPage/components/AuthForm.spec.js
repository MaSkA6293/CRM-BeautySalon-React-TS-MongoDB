import React from "react";
import Authform from "./Authform.tsx";
describe("all tests AuthForm", () => {
  const props = {
    userIsLoading: false,
    userIsLogining: false,
    signIn: () => {},
    signUp: () => {},
  };

  describe("Authform component", () => {
    it("should render Authform component", () => {
      const component = shallow(<Authform />);
      expect(component).toMatchSnapshot();
    });
  });
});
