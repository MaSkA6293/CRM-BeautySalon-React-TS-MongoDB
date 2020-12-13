import { call, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { editServiceRequest, editServiceSuccess, editServiceError } from "../actionCreators/editService";
import { clearMessageServices } from "../actionCreators";
import { SagaIterator } from "@redux-saga/core";
import { IRunEditService } from "../contracts/types";

export function* editServiceSaga(): SagaIterator {
    yield takeLatest(ServicesActionsType.EDIT_SERVICE, addService);
}

export function* addService(action: IRunEditService): SagaIterator {
    try {
        yield put(editServiceRequest());
        const response = yield call(httpRequest, "api/services", "PUT", action.payload.data);
        yield put(editServiceSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageServices());
    } catch (e) {
        yield put(editServiceError(e));
        yield delay(2000);
        yield put(clearMessageServices());
    }
}
