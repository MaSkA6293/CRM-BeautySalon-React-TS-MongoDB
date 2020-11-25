import { call, delay, put } from "redux-saga/effects";
import {
    EDIT_SERVIC,
    EDIT_SERVIC_REQUEST,
    EDIT_SERVIC_SUCCESS,
    CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS,
    EDIT_SERVIC_FAIL,
    CLEAR_MESSAGE_SERVIC_EDIT_FAIL,
} from "../../constants";
import { httpRequest } from "../../utils/network";
import { IService } from "../../pages/Services/types";

export function* editService(action: {
    payload: {
        data: {
            _id: string;
            name: string;
            duration: number[];
            cost: number;
            colorId: string;
            categoriesId: string[];
        };
        callback: () => void;
    };
}) {
    try {
        yield put(editServiceRequest());
        const response = yield call(httpRequest, "api/services", "PUT", action.payload.data);
        yield put(editServiceSuccess(response.data));
        yield delay(3000);
        yield put(clearEditServiceSuccess());
        yield call(action.payload.callback);
    } catch (e) {
        yield put(editServiceFail(e));
        yield delay(2000);
        yield put(clearEditServiceError());
    }
}
interface RunEditServicAction {
    type: typeof EDIT_SERVIC;
    payload: { data: IService; callback: () => void };
}

export const runEditServic = (data: IService, callback: () => void): RunEditServicAction => {
    return {
        type: EDIT_SERVIC,
        payload: { data, callback },
    };
};

export const editServiceRequest = () => {
    return {
        type: EDIT_SERVIC_REQUEST,
    };
};

export const editServiceSuccess = (data: { data: IService; message: string }) => {
    return {
        type: EDIT_SERVIC_SUCCESS,
        payload: { data: data.data, message: data.message },
    };
};

export const clearEditServiceSuccess = () => {
    return { type: CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS };
};

export const editServiceFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: EDIT_SERVIC_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};

export const clearEditServiceError = () => {
    return { type: CLEAR_MESSAGE_SERVIC_EDIT_FAIL };
};
