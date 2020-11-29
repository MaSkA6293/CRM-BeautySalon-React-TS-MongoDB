import { call, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesError } from "../actionCreators/fetchServices";
import { clearMessageServices } from "../actionCreators";

export function* fetchServicesSaga() {
    yield takeLatest(ServicesActionsType.FETCH_SERVICES, fetchServices);
}

export function* fetchServices(): Generator<any, any, any> {
    try {
        yield put(fetchServicesRequest());
        const services = yield call(httpRequest, "api/services", "GET");
        yield put(fetchServicesSuccess(services));
    } catch (e) {
        yield put(fetchServicesError(e));
        yield delay(4000);
        yield put(clearMessageServices());
    }
}
