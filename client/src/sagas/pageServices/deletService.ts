import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
    DELET_SERVICE,
    DELET_SERVIC_REQUEST,
    DELET_SERVIC_SUCCESS,
    CLEAR_MESSAGE_SERVIC_DELET_SUCCESS,
    DELET_SERVIC_FAIL,
    CLEAR_MESSAGE_SERVIC_DELET_FAIL,
} from "../../constants";

export function* deletServic(action: { payload: { _id: string; callback: () => void } }) {
    try {
        yield put(deletServiceRequest());
        const response = yield call(httpRequest, "api/services", "DELETE", {
            _id: action.payload._id,
        });
        yield put(deletServiceSuccess(response.data));
        yield delay(3000);
        yield put(clearDeletServiceSuccess());
        yield call(action.payload.callback);
    } catch (e) {
        yield put(deletServiceFail(e));
        yield delay(2000);
        yield put(clearDeletServiceError());
    }
}

export const rundDeletService = (_id: string, callback: () => void) => {
    return {
        type: DELET_SERVICE,
        payload: { _id: _id, callback: callback },
    };
};

export const deletServiceRequest = () => {
    return {
        type: DELET_SERVIC_REQUEST,
    };
};
export const deletServiceSuccess = (data: { _id: string; message: string }) => {
    return {
        type: DELET_SERVIC_SUCCESS,
        payload: { _id: data._id, message: data.message },
    };
};

export const clearDeletServiceSuccess = () => {
    return { type: CLEAR_MESSAGE_SERVIC_DELET_SUCCESS };
};

export const deletServiceFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: DELET_SERVIC_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
export const clearDeletServiceError = () => {
    return { type: CLEAR_MESSAGE_SERVIC_DELET_FAIL };
};
