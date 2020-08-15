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
    console.log(data);
    httpRequest("api/auth/register", "POST", { ...data })
      .then((res: any) => {
        if (res.data.status === "OK") {
          setTimeout(() => {
            dispatch({
              type: USER_REQUEST_SUCCESS,
            });
          }, 2000);
        } else {
          throw new Error(res.data.errorMessage || "Что-то пошло не так");
        }
      })
      .catch((e) => {
        dispatch({
          type: USER_REQUEST_FAIL,
          payload: { message: e.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_USER_REQUEST_FAIL });
        }, 2000);
      });
  };
};

export const sugnInHandler = (data: { email: string; password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    httpRequest("api/auth/login", "POST", { ...data })
      .then((res: any) => {
        if (res.data.status === "OK") {
          setTimeout(() => {
            const { token, userId } = res.data;
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: { token, userId },
            });
            localStorage.setItem(
              "userData",
              JSON.stringify({ token, id: userId })
            );
          }, 2000);
        } else {
          throw new Error(res.data.errorMessage || "Что-то пошло не так");
        }
      })
      .catch((e) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: { message: e.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_LOGIN_FAIL });
        }, 2000);
      });
  };
};

export const sugnOutHandler = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGOOUT });
    localStorage.removeItem("userData");
  };
};

export const authHandler = (token: string, id: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    setTimeout(() => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { token, id },
      });
      dispatch(userReady(true));
    }, 3000);
  };
};

export const userReady = (value: boolean) => {
  return { type: USER_READY, payload: value };
};
