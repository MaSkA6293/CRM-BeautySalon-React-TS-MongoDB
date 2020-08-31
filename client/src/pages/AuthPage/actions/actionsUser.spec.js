import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../../reducers/user";
import {
  USER_READY,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOOUT,
  CLEAR_LOGIN_FAIL,
  USER_LOGIN_FAIL,
  CLEAR_USER_REQUEST_FAIL,
  USER_REQUEST_FAIL,
  USER_REQUEST_SUCCESS,
} from "../../../constants";
import {
  userReady,
  userLoginSuccess,
  userLoginRequest,
  userLogoOut,
  sugnOutHandler,
  clearLoginFail,
  userLoginFail,
  clearUserRequestError,
  userRequestFail,
  userRequestSuccess,
} from "./actionUser";

const mockStore = configureStore([thunk]);

describe("User actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("userReady", () => {
    const mockStatus = true;
    store.dispatch(userReady(mockStatus));
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_READY,
        payload: true,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("userLoginSuccess", () => {
    const token = "test_token";
    const refresh_token = "test_refresh_token";
    const userId = "test_id12345";
    store.dispatch(userLoginSuccess(token, refresh_token, userId));
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_LOGIN_SUCCESS,
        payload: { token, refresh_token, userId },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("userLoginRequest", () => {
    store.dispatch(userLoginRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_LOGIN_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("userLogoOut", () => {
    store.dispatch(userLogoOut());
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_LOGOOUT,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("sugnOutHandler", () => {
    store.dispatch(sugnOutHandler());
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_LOGOOUT,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("userRequestSuccess", () => {
    store.dispatch(userRequestSuccess());
    const actions = store.getActions();
    const expectActions = [{ type: USER_REQUEST_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("clearLoginFail", () => {
    store.dispatch(clearLoginFail());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_LOGIN_FAIL }];
    expect(actions).toEqual(expectActions);
  });

  it("clearUserRequestError", () => {
    store.dispatch(clearUserRequestError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_USER_REQUEST_FAIL }];
    expect(actions).toEqual(expectActions);
  });

  it("userRequestFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(userRequestFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: USER_REQUEST_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  describe("userLoginFail", () => {
    it("userLoginFail error.response.data.message = null", () => {
      const error = {
        response: { data: { message: null } },
      };
      store.dispatch(userLoginFail(error));
      const actions = store.getActions();
      const expectActions = [
        {
          type: USER_LOGIN_FAIL,
          payload: {
            message: "Что-то пошло не так, попробуйте снова",
          },
        },
      ];
      expect(actions).toEqual(expectActions);
    });
    it("userLoginFail error.response.data.message = 'some problem", () => {
      const error = {
        response: { data: { message: "some problem" } },
      };
      store.dispatch(userLoginFail(error));
      const actions = store.getActions();
      const expectActions = [
        {
          type: USER_LOGIN_FAIL,
          payload: {
            message: error.response.data.message,
          },
        },
      ];
      expect(actions).toEqual(expectActions);
    });
  });
});
