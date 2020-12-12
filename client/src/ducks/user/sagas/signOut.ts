import { put, takeLatest } from "redux-saga/effects";
import { UserActionsType } from "../contracts/actionTypes";
import { userSignOut } from "../actionCreators/signOut";
import { SagaIterator } from "@redux-saga/core";

export function* signOutSaga(): SagaIterator {
    yield takeLatest(UserActionsType.USER_SIGN_OUT, signOut);
}

export function* signOut(): SagaIterator {
    yield put(userSignOut());
    localStorage.removeItem("userData");
}
