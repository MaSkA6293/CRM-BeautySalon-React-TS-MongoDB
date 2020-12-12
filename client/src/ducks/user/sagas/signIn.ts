import { call, delay, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { signInRequest, signInSuccess, setUser, signInFail } from "../actionCreators/signIn";
import { UserActionsType } from "../contracts/actionTypes";
import { userClearMessage } from "../actionCreators";
import { SagaIterator } from "@redux-saga/core";
import { ISignIn } from "../contracts/types";

export function* signInSaga(): SagaIterator {
    yield takeLatest(UserActionsType.USER_SIGNIN, signIn);
}

export function* signIn(action: ISignIn): SagaIterator {
    try {
        yield put(signInRequest());
        const response = yield call(httpRequest, "api/auth/signIn", "POST", action.payload);
        const { token, refresh_token, user } = response.data;
        yield put(signInSuccess(user));
        yield call(setUser, token, refresh_token);
        yield delay(3000);
        yield put(userClearMessage());
    } catch (e) {
        yield put(signInFail(e));
        yield delay(2000);
        yield put(userClearMessage());
    }
}
