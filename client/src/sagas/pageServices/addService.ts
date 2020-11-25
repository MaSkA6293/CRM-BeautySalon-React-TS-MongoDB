import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
    ADD_SERVIC,
    ADD_SERVIC_REQUEST,
    ADD_SERVIC_SUCCESS,
    CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
    ADD_SERVIC_FAIL,
    CLEAR_MESSAGE_SERVIC_ADD_FAIL,
} from "../../constants";
import { IService } from "../../pages/Services/types";

export function* addService(action: {
    payload: {
        data: {
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
        yield put(addServiceRequest());
        const response = yield call(httpRequest, "api/services", "POST", action.payload.data);
        yield put(addServiceSuccess(response.data));
        yield delay(3000);
        yield put(clearAddServiceSuccess());
        yield call(action.payload.callback);
    } catch (e) {
        yield put(addServiceFail(e));
        yield delay(2000);
        yield put(clearAddServiceError());
    }
}

export const runAddService = (
    data: {
        name: string;
        duration: number[];
        cost: number;
        colorId: string;
        categoriesId: string[];
    },
    callback: () => void,
) => {
    return {
        type: ADD_SERVIC,
        payload: {
            data,
            callback,
        },
    };
};

export const addServiceRequest = () => {
    return {
        type: ADD_SERVIC_REQUEST,
    };
};
export const addServiceSuccess = (data: { data: IService; message: string }) => {
    return {
        type: ADD_SERVIC_SUCCESS,
        payload: { data: data.data, message: data.message },
    };
};
export const clearAddServiceSuccess = () => {
    return { type: CLEAR_MESSAGE_SERVIC_ADD_SUCCESS };
};
export const addServiceFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: ADD_SERVIC_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};

export const clearAddServiceError = () => {
    return { type: CLEAR_MESSAGE_SERVIC_ADD_FAIL };
};
