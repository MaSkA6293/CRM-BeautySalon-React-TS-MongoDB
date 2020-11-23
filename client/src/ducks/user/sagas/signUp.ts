import { call, delay, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { signUpRequest, signUpRequestSuccess, signUpRequestClearMessage, signUpRequestRequestFail } from '../actionCreators/signUp'
import { UserActionsType } from "../contracts/actionTypes"


export function* signUpSaga() {
  yield takeLatest(UserActionsType.USER_SIGNUP, signUp);
}


export function* signUp(action: {
  type: UserActionsType.USER_SIGNUP,
  payload: { data: { email: string; password: string; confirmPassword: string } };
}) {
  try {
    yield put(signUpRequest());
    const responst = yield call(
      httpRequest,
      "api/auth/signUp",
      "POST",
      action.payload
    );
    yield put(signUpRequestSuccess(responst.data.message));
    yield delay(3000);
    yield put(signUpRequestClearMessage());
  } catch (e) {
    yield put(signUpRequestRequestFail(e));
    yield delay(2000);
    yield put(signUpRequestClearMessage());
  }
}
