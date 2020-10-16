
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network"
import {
    USER_SIGNIN,
    SIGNIN_REQUEST,
    USER_READY,
    CLEAR_SIGNIN_MESSAGE,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL
} from "../../constants"


export function* signIn(action: { payload: { data: { email: string; password: string } } }) {
    try {
        yield put(signInRequest())
        const response = yield call(httpRequest, "api/auth/login", "POST", action.payload)
        const { token, refresh_token, userId } = response.data;
        yield put(signInSuccess(token, refresh_token, userId))
        yield put(userReady(true))
        yield call(setUser, token, refresh_token, userId)
        yield delay(3000)
        yield put(signInClearMessage())
    } catch (e) {
        yield put(signInFail(e))
        yield delay(2000);
        yield put(signInClearMessage())
    }
};

export const setUser = (token: string, refresh_token: string, userId: string) => {
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

export const runSignIn = (data: { email: string; password: string }) => {

    return {
        type: USER_SIGNIN,
        payload: data
    }
}

export const userReady = (value: boolean) => {
    return { type: USER_READY, payload: value };
};

export const signInRequest = () => {
    return { type: SIGNIN_REQUEST };
};



export const signInClearMessage = () => {
    return { type: CLEAR_SIGNIN_MESSAGE };
};

export const signInSuccess = (
    token: string,
    refresh_token: string,
    userId: string
) => {
    return {
        type: SIGNIN_SUCCESS,
        payload: { token, refresh_token, userId },
    };
};

export const signInFail = (error: {
    response: { data: { message: string } };
}) => {
    return {
        type: SIGNIN_FAIL,
        payload: {
            message: error.response.data.message
                ? error.response.data.message
                : "Что-то пошло не так, попробуйте снова",
        },
    };
};