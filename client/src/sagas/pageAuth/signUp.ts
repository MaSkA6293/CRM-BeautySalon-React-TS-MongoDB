
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network"
import {
    USER_SIGNUP,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    CLEAR_SIGNUP_MESSAGE,
} from "../../constants"

export function* signUp(action: { payload: { data: { email: string; password: string } } }) {
    try {
        yield put(signUpRequest())
        const responst = yield call(httpRequest, "api/auth/register", "POST", action.payload)
        yield put(signUpRequestSuccess(responst.data.message))
        yield delay(3000)
        yield put(signUpRequestClearMessage())
    } catch (e) {
        yield put(signUpRequestRequestFail(e))
        yield delay(2000);
        yield put(signUpRequestClearMessage())
    }
};

export const runSignUp = (data: { email: string; password: string }) => {
    return {
        type: USER_SIGNUP,
        payload: data
    }
}
export const signUpRequest = () => {
    return { type: SIGNUP_REQUEST }
}


export const signUpRequestSuccess = (message: string) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: { message },
    };
};

export const signUpRequestRequestFail = (e: {
    response: { data: { message: string } };
}) => {
    return {
        type: SIGNUP_FAIL,
        payload: { message: e.response.data.message },
    };
};

export const signUpRequestClearMessage = () => {
    return { type: CLEAR_SIGNUP_MESSAGE };
};
