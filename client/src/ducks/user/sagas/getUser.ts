import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { UserActionsType } from "../contracts/actionTypes"
import { getUserSuccess } from '../actionCreators/getUser'
import { runSignOut } from "../sagas/signOut"
export function* getUserSaga() {
    yield takeLatest(UserActionsType.GET_USER, getUser);
}

export function* getUser() {
    try {
        const response = yield call(
            httpRequest,
            "api/auth/getUser",
            "GET"
        );
        const user = response.data;
        yield put(getUserSuccess(user));
    } catch (e) {
        yield put(runSignOut())
    }
}

