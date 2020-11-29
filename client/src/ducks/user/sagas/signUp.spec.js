import { runSignUp, signUpRequest, signUpSuccess, signUpFail } from "../actionCreators/signUp";
import { signUp } from "./signUp";
import { userClearMessage } from "../actionCreators";

import { UserActionsType } from "../contracts/actionTypes";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga signUp", () => {
    const action = runSignUp({ email: "", password: "" });
    const saga = signUp(action);
    let output = null;
    it("should put signUpRequest", () => {
        output = saga.next().value;
        let expected = put(signUpRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/auth/signUp method POST", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/auth/signUp", "POST", action.payload);
        expect(output).toEqual(expected);
    });
    it("test should put signUpSuccess", () => {
        const response = { data: [], message: "success" };
        output = saga.next(response).value;
        let expected = put(signUpSuccess(response.data.message));
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

describe("test signUp Error", () => {
    const action = runSignUp({ email: "", password: "" });
    const sagaError = signUp(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(signUpFail(error));
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

describe("test signUp actions", () => {
    it("runSignUp", () => {
        const data = { email: "", password: "" };
        const actions = runSignUp(data);
        const expectActions = {
            type: UserActionsType.USER_SIGNUP,
            payload: data,
        };
        expect(actions).toEqual(expectActions);
    });
    it("signUpRequest", () => {
        const actions = signUpRequest();
        const expectActions = {
            type: UserActionsType.SIGNUP_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("signUpRequestSuccess", () => {
        const message = "success";
        const actions = signUpSuccess(message);
        const expectActions = {
            type: UserActionsType.SIGNUP_SUCCESS,
            payload: { message },
        };
        expect(actions).toEqual(expectActions);
    });

    it("signUpRequestRequestFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = signUpFail(error);
        const expectActions = {
            type: UserActionsType.SIGNUP_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
