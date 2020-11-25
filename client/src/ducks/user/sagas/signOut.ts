import { put, takeLatest } from "redux-saga/effects";
import { UserActionsType } from "../contracts/actionTypes";

export function* signOutSaga() {
    yield takeLatest(UserActionsType.USER_SIGN_OUT, signOut);
}

export function* signOut() {
    yield put(userSignOut());
    localStorage.removeItem("userData");
}

export const userSignOut = () => {
    return {
        type: UserActionsType.SIGN_OUT,
    };
};
export const runSignOut = () => {
    return {
        type: UserActionsType.USER_SIGN_OUT,
    };
};
