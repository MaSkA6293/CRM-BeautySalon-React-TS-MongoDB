import {
  userReady,
  runSignIn,
  signIn,
  signInRequest,
  signInSuccess,
  signInFail,
  setUser,
  signInClearMessage,
} from "./signIn";
import {
  USER_SIGNIN,
  SIGNIN_REQUEST,
  USER_READY,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  CLEAR_SIGNIN_MESSAGE,
} from "../../../constants";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga signIn", () => {
  const action = {
    payload: { data: { email: "", password: "" } },
  };
  const saga = signIn(action);
  let output = null;
  it("should put signInRequest", () => {
    output = saga.next().value;
    let expected = put(signInRequest());
    expect(output).toEqual(expected);
  });
  it("should call api/auth/login", (done) => {
    output = saga.next().value;
    done();
    let expected = call(httpRequest, "api/auth/login", "POST", action.payload);
    expect(output).toEqual(expected);
  });
  it("test should put signUpRequestSuccess", () => {
    const token = "";
    const refresh_token = "";
    const userId = "";
    const response = { data: { token, refresh_token, userId } };
    output = saga.next(response).value;
    let expected = put(signInSuccess(token, refresh_token, userId));
    expect(output).toEqual(expected);
  });

  it("test should put userReady", () => {
    output = saga.next(true).value;
    let expected = put(userReady(true));
    expect(output).toEqual(expected);
  });

  it("should call setUser", (done) => {
    const token = "";
    const refresh_token = "";
    const userId = "";
    output = saga.next().value;
    done();
    let expected = call(setUser, token, refresh_token, userId);
    expect(output).toEqual(expected);
  });

  it("should delay 3000", () => {
    output = saga.next().value;
    let expected = delay(3000);
    expect(output).toEqual(expected);
  });

  it("should put signInClearMessage ", () => {
    output = saga.next().value;
    let expected = put(signInClearMessage());
    expect(output).toEqual(expected);
  });
  it("should end", () => {
    output = saga.next().done;
    let expected = true;
    expect(output).toBe(expected);
  });
});

describe("test signIn Error", () => {
  const action = {
    payload: { data: { email: "", password: "" } },
  };
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
    let expected = put(signInClearMessage());
    expect(output).toEqual(expected);
  });
  it("should end", () => {
    output = sagaError.next().done;
    let expected = true;
    expect(output).toBe(expected);
  });
});

describe("test signIp actions", () => {
  it("runSignIp", () => {
    const data = { email: "", password: "" };
    const actions = runSignIn(data);
    const expectActions = {
      type: USER_SIGNIN,
      payload: data,
    };
    expect(actions).toEqual(expectActions);
  });

  it("signInRequest", () => {
    const actions = signInRequest();
    const expectActions = {
      type: SIGNIN_REQUEST,
    };
    expect(actions).toEqual(expectActions);
  });
  it("signInSuccess", () => {
    const token = "";
    const refresh_token = "";
    const userId = "";
    const actions = signInSuccess(token, refresh_token, userId);
    const expectActions = {
      type: SIGNIN_SUCCESS,
      payload: { token, refresh_token, userId },
    };
    expect(actions).toEqual(expectActions);
  });

  it("signInFail", () => {
    const error = { response: { data: { message: "some error" } } };
    const actions = signInFail(error);
    const expectActions = {
      type: SIGNIN_FAIL,
      payload: {
        message: error.response.data.message
          ? error.response.data.message
          : '"Что-то пошло не так, попробуйте снова"',
      },
    };
    expect(actions).toEqual(expectActions);
  });
  it("signInClearMessage", () => {
    const actions = signInClearMessage();
    const expectActions = { type: CLEAR_SIGNIN_MESSAGE };
    expect(actions).toEqual(expectActions);
  });
});
