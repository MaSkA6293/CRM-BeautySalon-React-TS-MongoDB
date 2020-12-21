import React from "react";
import { AuthPage } from "./index";
import { Provider } from "react-redux";
import store from "../../store";

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

const setUp = (props) =>
    render(
        <Provider store={store}>
            <AuthPage {...props} />
        </Provider>,
    );

describe("all tests AuthPage", () => {
    let component;
    describe("AuthPage component", () => {
        it("should render AuthPage variant:true", () => {
            const authPageProps = {
                signIn: false,
                signUp: false,
                variant: true,
            };
            component = setUp(authPageProps);
            expect(component).toMatchSnapshot();
        });
        it("should render AuthPage signIn:true", () => {
            const authPageProps = {
                signIn: true,
                signUp: false,
                variant: false,
            };
            component = setUp(authPageProps);
            expect(component).toMatchSnapshot();
        });
        it("should render AuthPage signUp:true", () => {
            const authPageProps = {
                signIn: false,
                signUp: true,
                variant: false,
            };
            component = setUp(authPageProps);
            expect(component).toMatchSnapshot();
        });
    });
});
