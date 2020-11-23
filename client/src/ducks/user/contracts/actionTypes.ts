import { Action } from "redux";
import { User } from "./state"
export enum UserActionsType {
    SIGNUP_REQUEST = 'user/SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS',
    SIGNUP_FAIL = 'user/SIGNUP_FAIL',
    CLEAR_SIGNUP_MESSAGE = 'user/CLEAR_SIGNUP_MESSAGE',
    SIGNIN_REQUEST = 'user/SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS',
    SIGNIN_FAIL = 'user/SIGNIN_FAIL',
    CLEAR_SIGNIN_MESSAGE = 'user/CLEAR_SIGNIN_MESSAGE',
    SIGN_OUT = 'user/SIGN_OUT',
    USER_SIGNUP = 'user/USER_SIGNUP',
    USER_SIGN_OUT = 'user/USER_SIGN_OUT',
    USER_SIGNIN = 'user/USER_SIGNIN',
    GET_USER = 'user/GET_USER',
    GET_USER_SUCCESS = 'user/GET_USER_SUCCESS'
}
export interface IGetUserSuccess extends Action<UserActionsType> {
    type: typeof UserActionsType.GET_USER_SUCCESS,
    payload: User
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
    type: typeof UserActionsType.CLEAR_SIGNUP_MESSAGE;
}

export interface IUserLoginRequest extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_REQUEST;
}

export interface IUserLoginSuccess extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_SUCCESS;
    payload: { id: string };
}

export interface ILoginUserFail extends Action<UserActionsType> {
    type: typeof UserActionsType.SIGNIN_FAIL;
    payload: { message: string };
}
export interface ILoginUserFailClear extends Action<UserActionsType> {
    type: typeof UserActionsType.CLEAR_SIGNIN_MESSAGE;
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
    | IGetUserSuccess