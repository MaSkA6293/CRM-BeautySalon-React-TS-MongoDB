import { call, delay, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { signUpRequest, signUpSuccess, signUpFail } from "../actionCreators/signUp";
import { userClearMessage } from "../actionCreators";
import { UserActionsType } from "../contracts/actionTypes";

export function* signUpSaga() {
    yield takeLatest(UserActionsType.USER_SIGNUP, signUp);
}

interface ISignUp {
    type: UserActionsType.USER_SIGNUP;
    payload: { data: { email: string; password: string; confirmPassword: string } };
}

export function* signUp(action: ISignUp) {
    try {
        yield put(signUpRequest());
        const responst = yield call(httpRequest, "api/auth/signUp", "POST", action.payload);
        yield put(signUpSuccess(responst.data.message));
        yield delay(3000);
        yield put(userClearMessage());
    } catch (e) {
        yield put(signUpFail(e));
        yield delay(2000);
        yield put(userClearMessage());
    }
}
