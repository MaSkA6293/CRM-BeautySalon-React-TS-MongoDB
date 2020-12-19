import { call, delay, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { signUpRequest, signUpSuccess, signUpFail } from "../actionCreators/signUp";
import { userClearMessage } from "../actionCreators";
import { UserActionsType } from "../contracts/actionTypes";
import { SagaIterator } from "@redux-saga/core";
import { ISignUp } from "../contracts/types";

export function* signUpSaga(): SagaIterator {
    yield takeLatest(UserActionsType.USER_SIGNUP, signUp);
}

export function* signUp(action: ISignUp): SagaIterator {
    try {
        yield put(signUpRequest());
        const responst = yield call(httpRequest, "api/auth/signUp", "POST", action.payload.data);
        yield put(signUpSuccess(responst.data.message));
        yield delay(3000);
        yield put(userClearMessage());
        yield call(action.payload.cb);
    } catch (e) {
        yield put(signUpFail(e));
        yield delay(2000);
        yield put(userClearMessage());
    }
}
