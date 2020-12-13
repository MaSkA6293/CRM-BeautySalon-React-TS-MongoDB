import { call, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { deletServiceRequest, deletServiceSuccess, deletServiceError } from "../actionCreators/deletService";
import { clearMessageServices } from "../actionCreators";
import { SagaIterator } from "@redux-saga/core";
import { IRunDeletService } from "../contracts/types";

export function* deletServiceSaga(): SagaIterator {
    yield takeLatest(ServicesActionsType.DELET_SERVICE, deletService);
}

export function* deletService(action: IRunDeletService): SagaIterator {
    try {
        yield put(deletServiceRequest());
        const response = yield call(httpRequest, "api/services", "DELETE", {
            _id: action.payload._id,
        });
        yield put(deletServiceSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageServices());
    } catch (e) {
        yield put(deletServiceError(e));
        yield delay(2000);
        yield put(clearMessageServices());
    }
}
