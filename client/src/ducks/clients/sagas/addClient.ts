import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ClientsActionsType } from "../contracts/actionTypes";
import { addClientRequest, addClientSuccess, addClientFail } from "../actionCreators/addClient";
import { IClientValues } from "../contracts/state";
import { clientsClearMessage } from "../actionCreators";

export function* addClientSaga() {
    yield takeLatest(ClientsActionsType.ADD_CLIENT, addClient);
}

interface IAddClientProps {
    type: typeof ClientsActionsType.ADD_CLIENT;
    payload: {
        client: IClientValues;
        callback: () => void;
    };
}
export function* addClient(action: IAddClientProps) {
    try {
        yield put(addClientRequest());
        const response = yield call(httpRequest, "api/client", "POST", action.payload.client);
        yield put(addClientSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clientsClearMessage());
    } catch (e) {
        yield put(addClientFail(e));
        yield delay(2000);
        yield put(clientsClearMessage());
    }
}
