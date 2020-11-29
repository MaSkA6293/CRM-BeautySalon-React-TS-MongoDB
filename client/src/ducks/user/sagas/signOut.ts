import { put, takeLatest } from "redux-saga/effects";
import { UserActionsType } from "../contracts/actionTypes";
import { userSignOut } from "../actionCreators/signOut";

export function* signOutSaga() {
    yield takeLatest(UserActionsType.USER_SIGN_OUT, signOut);
}

export function* signOut() {
    yield put(userSignOut());
    localStorage.removeItem("userData");
}
