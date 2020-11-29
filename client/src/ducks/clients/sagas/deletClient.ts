import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ClientsActionsType } from "../contracts/actionTypes";
import { clientsClearMessage } from "../actionCreators";
import { deletClientRequest, deletClientSuccess, deletClientFail } from "../actionCreators/deletClient";

export function* deletClientSaga() {
    yield takeLatest(ClientsActionsType.DELET_CLIENT, deletClient);
}

interface IDeletClient {
    type: typeof ClientsActionsType.DELET_CLIENT;
    payload: {
        _id: number;
        callback: () => void;
    };
}
export function* deletClient(action: IDeletClient) {
    try {
        yield put(deletClientRequest());
        const response = yield call(httpRequest, `api/client/${action.payload._id}`, "DELETE");
        yield put(deletClientSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clientsClearMessage());
    } catch (e) {
        yield put(deletClientFail(e));
        yield delay(2000);
        yield put(clientsClearMessage());
    }
}
