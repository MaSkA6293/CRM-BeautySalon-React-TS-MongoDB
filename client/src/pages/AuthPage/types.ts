import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_SIGNUP_MESSAGE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  CLEAR_SIGNIN_MESSAGE,
  SIGN_OUT,
  USER_READY,
} from "../../constants";

export interface IstateUser {
  userLoaded: boolean;
  userIsLoading: boolean;
  userGetIsFail: boolean;
  userGetError: string;
  userIsLogining: boolean;
  userIsLogined: boolean;
  userLoginIsFail: boolean;
  userLoginError: string;
  userData: { token: string; id: string };
  userReady: boolean;
  userCreateSuccess: string;
}

//  USER
interface IUserRequestAction {
  type: typeof SIGNUP_REQUEST;
}

interface IUserRequestSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: { message: string };
}

interface IRequestUserFail {
  type: typeof SIGNUP_FAIL;
  payload: { message: string };
}
interface IRequestUserFailClear {
  type: typeof CLEAR_SIGNUP_MESSAGE;
}

interface IUserLoginRequest {
  type: typeof SIGNIN_REQUEST;
}

interface IUserLoginSuccess {
  type: typeof SIGNIN_SUCCESS;
  payload: { token: string; id: string; refresh_token: string };
}

interface ILoginUserFail {
  type: typeof SIGNIN_FAIL;
  payload: { message: string };
}
interface ILoginUserFailClear {
  type: typeof CLEAR_SIGNIN_MESSAGE;
}

interface ILogoOut {
  type: typeof SIGN_OUT;
}
interface IUserReady {
  type: typeof USER_READY;
  payload: boolean;
}

export type UserActionTypes =
  | IUserRequestAction
  | IUserRequestSuccess
  | IRequestUserFail
  | IRequestUserFailClear
  | IUserLoginRequest
  | IUserLoginSuccess
  | ILoginUserFail
  | ILoginUserFailClear
  | ILogoOut
  | IUserReady;
