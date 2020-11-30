import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ColorsActionsType } from "../contracts/actionTypes";
import { fetchColorsRequest, fetchColorsSuccess, fetchColorsError } from "../actionCreators/fetchColors";

export function* fetchColorsSaga() {
    yield takeLatest(ColorsActionsType.FETCH_COLORS, fetchColors);
}

export function* fetchColors(): Generator<any, any, any> {
    try {
        yield put(fetchColorsRequest());
        const Colors = yield call(httpRequest, "api/Colors", "GET");
        yield put(fetchColorsSuccess(Colors));
    } catch (e) {
        yield put(fetchColorsError(e));
    }
}
