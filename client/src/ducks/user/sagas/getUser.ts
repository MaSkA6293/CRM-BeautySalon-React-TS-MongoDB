import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { UserActionsType } from "../contracts/actionTypes";
import { getUserSuccess } from "../actionCreators/getUser";
import { runSignOut } from "../actionCreators/signOut";
import { SagaIterator } from "@redux-saga/core";

export function* getUserSaga(): SagaIterator {
    yield takeLatest(UserActionsType.GET_USER, getUser);
}

export function* getUser(): SagaIterator {
    try {
        const response = yield call(httpRequest, "api/auth/getUser", "GET");
        const user = response.data;
        yield put(getUserSuccess(user));
    } catch (e) {
        yield put(runSignOut());
    }
}
