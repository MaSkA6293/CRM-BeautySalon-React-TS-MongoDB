import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ClientsActionsType } from "../contracts/actionTypes";
import { editClientRequest, editClientSuccess, editClientFail } from "../actionCreators/editClient";
import { IClient } from "../contracts/state";
import { clientsClearMessage } from "../actionCreators";

export function* editClientSaga() {
    yield takeLatest(ClientsActionsType.EDIT_CLIENT, editClient);
}

interface IEditClientProps {
    type: typeof ClientsActionsType.EDIT_CLIENT;
    payload: {
        client: IClient;
        callback: () => void;
    };
}
export function* editClient(action: IEditClientProps) {
    try {
        yield put(editClientRequest());
        const response = yield call(
            httpRequest,
            `api/client/${action.payload.client._id}`,
            "PUT",
            action.payload.client,
        );
        yield put(editClientSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clientsClearMessage());
    } catch (e) {
        yield put(editClientFail(e));
        yield delay(2000);
        yield put(clientsClearMessage());
    }
}
