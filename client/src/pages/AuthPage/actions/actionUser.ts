import {
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAIL,
  CLEAR_USER_REQUEST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  CLEAR_LOGIN_FAIL,
  USER_LOGOOUT,
  USER_READY,
} from "../../../constants";
import { Dispatch } from "redux";

import { httpRequest } from "../../../utils/network";
export const registerHandler = (data: { email: string; password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_REQUEST });
    httpRequest("api/auth/register", "POST", { ...data })
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch(userRequestSuccess(res.data.message));
        }
      })
      .catch((e) => {
        dispatch(userRequestFail(e));
        setTimeout(() => {
          dispatch(clearUserRequestError());
        }, 2000);
      });
  };
};

export const sugnInHandler = (data: { email: string; password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoginRequest());
    httpRequest("api/auth/login", "POST", { ...data })
      .then((res: any) => {
        if (res.statusText === "OK") {
          const { token, refresh_token, userId } = res.data;
          dispatch(userLoginSuccess(token, refresh_token, userId));
          dispatch(userReady(true));
          localStorage.setItem(
            "userData",
            JSON.stringify({
              token,
              refresh_token,
              id: userId,
              expires_in: Date.now() + 10 * 1000,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(userLoginFail(error));
        setTimeout(() => {
          dispatch(clearLoginFail());
        }, 2000);
      });
  };
};

export const userLoginFail = (error: {
  response: { data: { message: string } };
}) => {
  return {
    type: USER_LOGIN_FAIL,
    payload: {
      message: error.response.data.message
        ? error.response.data.message
        : "Что-то пошло не так, попробуйте снова",
    },
  };
};

export const sugnOutHandler = () => {
  return (dispatch: Dispatch) => {
    dispatch(userLogoOut());
    localStorage.removeItem("userData");
  };
};

export const authHandler = (
  token: string,
  refresh_token: string,
  id: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoginRequest());
    setTimeout(() => {
      dispatch(userLoginSuccess(token, refresh_token, id));
      dispatch(userReady(true));
    }, 100);
  };
};

export const userLogoOut = () => {
  return { type: USER_LOGOOUT };
};

export const userLoginRequest = () => {
  return { type: USER_LOGIN_REQUEST };
};

export const userReady = (value: boolean) => {
  return { type: USER_READY, payload: value };
};

export const clearLoginFail = () => {
  return { type: CLEAR_LOGIN_FAIL };
};

export const userLoginSuccess = (
  token: string,
  refresh_token: string,
  userId: string
) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: { token, refresh_token, userId },
  };
};
export const userRequestSuccess = (message: string) => {
  return {
    type: USER_REQUEST_SUCCESS,
    payload: { message },
  };
};

export const userRequestFail = (e: {
  response: { data: { message: string } };
}) => {
  return {
    type: USER_REQUEST_FAIL,
    payload: { message: e.response.data.message },
  };
};

export const clearUserRequestError = () => {
  return { type: CLEAR_USER_REQUEST_FAIL };
};
