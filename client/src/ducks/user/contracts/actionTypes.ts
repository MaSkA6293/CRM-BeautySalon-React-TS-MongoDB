import { Action } from "redux";
import { User } from "./state";
export enum UserActionsType {
    CLEAR_USER_MESSAGE = "user/CLEAR_USER_MESSAGE",

    USER_SIGNIN = "user/USER_SIGNIN",
    SIGNIN_REQUEST = "user/SIGNIN_REQUEST",
    SIGNIN_SUCCESS = "user/SIGNIN_SUCCESS",
    SIGNIN_FAIL = "user/SIGNIN_FAIL",

    USER_SIGNUP = "user/USER_SIGNUP",
    SIGNUP_REQUEST = "user/SIGNUP_REQUEST",
    SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS",
    SIGNUP_FAIL = "user/SIGNUP_FAIL",

    USER_SIGN_OUT = "user/USER_SIGN_OUT",
    SIGN_OUT = "user/SIGN_OUT",

    GET_USER = "user/GET_USER",
    GET_USER_SUCCESS = "user/GET_USER_SUCCESS",
}
export interface IGetUserSuccess extends Action<UserActionsType> {
    type: typeof UserActionsType.GET_USER_SUCCESS;
    payload: User;
}
export interface IUserRequestAction extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNUP_REQUEST;
}

export interface IUserRequestSuccess extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNUP_SUCCESS;
    payload: { message: string };
}

export interface IRequestUserFail extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNUP_FAIL;
    payload: { message: string };
}
export interface IRequestUserFailClear extends Action<UserActionsType> {
    type: typeof UserActionsType.CLEAR_USER_MESSAGE;
}

export interface IUserLoginRequest extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_REQUEST;
}
export interface IUserLoginSuccess extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_SUCCESS;
    payload: { id: string };
}

export interface ILoginUserFailClear extends Action<UserActionsType> {
    type: typeof UserActionsType.CLEAR_USER_MESSAGE;
}

export interface ILoginUserFail extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_FAIL;
    payload: { message: string };
}

export interface ILogoOut extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGN_OUT;
}

export type UserActions =
    | IUserRequestAction
    | IUserRequestSuccess
    | IRequestUserFail
    | IRequestUserFailClear
    | IUserLoginRequest
    | IUserLoginSuccess
    | ILoginUserFail
    | ILoginUserFailClear
    | ILogoOut
    | IGetUserSuccess;
