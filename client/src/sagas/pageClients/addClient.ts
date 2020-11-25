import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import { IClientValues } from "../../types/typesClients";
import {
    ADD_CLIENT,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    CLEAR_MESSAGE_CLIENT,
    CLIENT_ADD_FAIL,
} from "../../constants";
import { IClient } from "../../types/typesClients";

export const runAddClient = (client: IClientValues, callback: () => void) => {
    return {
        type: ADD_CLIENT,
        payload: {
            client,
            callback,
        },
    };
};

export const addClientRequest = () => {
    return {
        type: ADD_CLIENT_REQUEST,
    };
};
export const addClientSuccess = (response: { client: IClient; message: string }) => {
    return {
        type: ADD_CLIENT_SUCCESS,
        payload: {
            client: response.client,
            message: response.message,
        },
    };
};

export const clearMessageClient = () => {
    return {
        type: CLEAR_MESSAGE_CLIENT,
    };
};

export const addClientFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: CLIENT_ADD_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};

export function* addClient(action: {
    payload: {
        client: IClientValues;
        callback: () => void;
    };
}) {
    try {
        yield put(addClientRequest());
        const response = yield call(httpRequest, "api/client", "POST", action.payload.client);
        yield put(addClientSuccess(response.data));
        yield delay(3000);
        yield put(clearMessageClient());
        yield call(action.payload.callback);
    } catch (e) {
        yield put(addClientFail(e));
        yield delay(2000);
        yield put(clearMessageClient());
    }
}
