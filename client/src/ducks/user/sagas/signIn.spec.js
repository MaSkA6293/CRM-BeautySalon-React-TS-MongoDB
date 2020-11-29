import { signIn } from "./signIn";
import { signInRequest, signInSuccess, setUser, signInFail, runSignIn } from "../actionCreators/signIn";
import { userClearMessage } from "../actionCreators";
import { UserActionsType } from "../contracts/actionTypes";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga signIn", () => {
    const action = runSignIn({ email: "", password: "" });
    const saga = signIn(action);
    let output = null;
    it("should put signInRequest", () => {
        output = saga.next().value;
        let expected = put(signInRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/auth/signIn method POST", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/auth/signIn", "POST", action.payload);
        expect(output).toEqual(expected);
    });
    it("test should put signInSuccess", () => {
        const token = "";
        const refresh_token = "";
        const user = {};
        const response = { data: { token, refresh_token, user } };
        output = saga.next(response).value;
        let expected = put(signInSuccess(user));
        expect(output).toEqual(expected);
    });
    it("test should call setUser", (done) => {
        const token = "";
        const refresh_token = "";
        output = saga.next(token, refresh_token).value;
        done();
        let expected = call(setUser, token, refresh_token);
        expect(output).toEqual(expected);
    });
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });

    it("should put userClearMessage ", () => {
        output = saga.next().value;
        let expected = put(userClearMessage());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test signIn Error", () => {
    const action = runSignIn({ email: "", password: "" });
    const sagaError = signIn(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(signInFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(userClearMessage());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test signIp actions", () => {
    it("runSignIn", () => {
        const data = { email: "", password: "" };
        const actions = runSignIn(data);
        const expectActions = {
            type: UserActionsType.USER_SIGNIN,
            payload: data,
        };
        expect(actions).toEqual(expectActions);
    });

    it("signInRequest", () => {
        const actions = signInRequest();
        const expectActions = {
            type: UserActionsType.SIGNIN_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("signInSuccess", () => {
        const user = {};
        const actions = signInSuccess(user);
        const expectActions = {
            type: UserActionsType.SIGNIN_SUCCESS,
            payload: user,
        };
        expect(actions).toEqual(expectActions);
    });

    it("signInFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = signInFail(error);
        const expectActions = {
            type: UserActionsType.SIGNIN_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
    it("userClearMessage", () => {
        const actions = userClearMessage();
        const expectActions = { type: UserActionsType.CLEAR_USER_MESSAGE };
        expect(actions).toEqual(expectActions);
    });
});
