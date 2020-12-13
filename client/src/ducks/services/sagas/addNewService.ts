import { call, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { addServiceRequest, addServiceSuccess, addServiceError } from "../actionCreators/addNewService";
import { clearMessageServices } from "../actionCreators";
import { SagaIterator } from "@redux-saga/core";
import { IRunAddNewService } from "../contracts/types";

export function* addNewServiceSaga(): SagaIterator {
    yield takeLatest(ServicesActionsType.ADD_NEW_SERVICE, addService);
}

export function* addService(action: IRunAddNewService): SagaIterator {
    try {
        yield put(addServiceRequest());
        const response = yield call(httpRequest, "api/services", "POST", action.payload.data);
        yield put(addServiceSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageServices());
    } catch (e) {
        yield put(addServiceError(e));
        yield delay(2000);
        yield put(clearMessageServices());
    }
}
