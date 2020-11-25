import { call, delay, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { signInRequest, signInSuccess, setUser, signInClearMessage, signInFail } from "../actionCreators/signIn";
import { UserActionsType } from "../contracts/actionTypes";

export function* signInSaga() {
    yield takeLatest(UserActionsType.USER_SIGNIN, signIn);
}

export function* signIn(action: {
    type: typeof UserActionsType.USER_SIGNIN;
    payload: { data: { email: string; password: string } };
}) {
    try {
        yield put(signInRequest());
        const response = yield call(httpRequest, "api/auth/signIn", "POST", action.payload);
        const { token, refresh_token, user } = response.data;
        yield put(signInSuccess(user));
        yield call(setUser, token, refresh_token);
        yield delay(3000);
        yield put(signInClearMessage());
    } catch (e) {
        yield put(signInFail(e));
        yield delay(2000);
        yield put(signInClearMessage());
    }
}
