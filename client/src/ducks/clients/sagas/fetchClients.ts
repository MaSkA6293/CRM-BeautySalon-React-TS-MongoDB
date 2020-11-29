import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ClientsActionsType } from "../contracts/actionTypes";
import { clientsRequestSuccess, clientsRequestFail } from "../actionCreators/fetchClients";
import { clientsClearMessage } from "../actionCreators";

export function* fetchClientsSaga() {
    yield takeLatest(ClientsActionsType.CLIENTS_REQUEST, fetchClients);
}

export function* fetchClients() {
    try {
        const response = yield call(httpRequest, "api/client", "GET");
        yield put(clientsRequestSuccess(response));
    } catch (err) {
        yield put(clientsRequestFail(err));
        yield delay(4000);
        yield put(clientsClearMessage());
    }
}
