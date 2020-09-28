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
  type: typeof USER_REQUEST;
}

interface IUserRequestSuccess {
  type: typeof USER_REQUEST_SUCCESS;
  payload: { message: string };
}

interface IRequestUserFail {
  type: typeof USER_REQUEST_FAIL;
  payload: { message: string };
}
interface IRequestUserFailClear {
  type: typeof CLEAR_USER_REQUEST_FAIL;
}

interface IUserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: { token: string; id: string; refresh_token: string };
}

interface ILoginUserFail {
  type: typeof USER_LOGIN_FAIL;
  payload: { message: string };
}
interface ILoginUserFailClear {
  type: typeof CLEAR_LOGIN_FAIL;
}

interface ILogoOut {
  type: typeof USER_LOGOOUT;
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
