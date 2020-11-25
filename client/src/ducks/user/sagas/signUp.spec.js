import {
    runSignUp,
    signUp,
    signUpRequest,
    signUpRequestSuccess,
    signUpRequestClearMessage,
    signUpRequestRequestFail,
} from "./signUp";
import { USER_SIGNUP, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, CLEAR_SIGNUP_MESSAGE } from "../../constants";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga signUp", () => {
    const action = {
        payload: { data: { email: "", password: "" } },
    };
    const saga = signUp(action);
    let output = null;
    it("should put signUpRequest", () => {
        output = saga.next().value;
        let expected = put(signUpRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/auth/register", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/auth/register", "POST", action.payload);
        expect(output).toEqual(expected);
    });
    it("test should put signUpRequestSuccess", () => {
        const response = { data: [], message: "success" };
        output = saga.next(response).value;
        let expected = put(signUpRequestSuccess(response.data.message));
        expect(output).toEqual(expected);
    });
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });
    it("should put signUpRequestClearMessage ", () => {
        output = saga.next().value;
        let expected = put(signUpRequestClearMessage());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test signUp Error", () => {
    const action = {
        payload: { data: { email: "", password: "" } },
    };
    const sagaError = signUp(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(signUpRequestRequestFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(signUpRequestClearMessage());
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
            type: USER_SIGNUP,
            payload: data,
        };
        expect(actions).toEqual(expectActions);
    });
    it("signUpRequest", () => {
        const actions = signUpRequest();
        const expectActions = {
            type: SIGNUP_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("signUpRequestSuccess", () => {
        const message = "success";
        const actions = signUpRequestSuccess(message);
        const expectActions = {
            type: SIGNUP_SUCCESS,
            payload: { message },
        };
        expect(actions).toEqual(expectActions);
    });

    it("signUpRequestRequestFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = signUpRequestRequestFail(error);
        const expectActions = {
            type: SIGNUP_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
    it("signUpRequestClearMessage", () => {
        const actions = signUpRequestClearMessage();
        const expectActions = { type: CLEAR_SIGNUP_MESSAGE };
        expect(actions).toEqual(expectActions);
    });
});
