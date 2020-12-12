import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ColorsActionsType } from "../contracts/actionTypes";
import { fetchColorsRequest, fetchColorsSuccess, fetchColorsError } from "../actionCreators/fetchColors";
import { SagaIterator } from "@redux-saga/core";

export function* fetchColorsSaga(): SagaIterator {
    yield takeLatest(ColorsActionsType.FETCH_COLORS, fetchColors);
}

export function* fetchColors(): SagaIterator {
    try {
        yield put(fetchColorsRequest());
        const colors = yield call(httpRequest, "api/Colors", "GET");
        yield put(fetchColorsSuccess(colors));
    } catch (e) {
        yield put(fetchColorsError(e));
    }
}
