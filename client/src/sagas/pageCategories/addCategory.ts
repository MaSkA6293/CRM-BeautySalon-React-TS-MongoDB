import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
    ADD_CATEGORY,
    ADD_SERVICE_CATEGORY_REQUEST,
    ADD_SERVICE_CATEGORY_SUCCESS,
    CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS,
    SERVICE_CATEGORY_ADD_FAIL,
    CLEAR_SERVICE_CATEGORY_ADD_FAIL,
} from "../../constants";
import { ICategory } from "../../pages/Services/types";

export function* addCategory(action: {
    payload: {
        data: {
            name: string;
            colorId: string;
        };
        callback: () => void;
    };
}) {
    try {
        yield put(addCategoryRequest());
        const response = yield call(httpRequest, "api/services/categories", "POST", action.payload.data);
        yield put(addCategorySuccess(response.data));
        yield delay(3000);
        yield put(clearAddCategorySuccess());
        yield call(action.payload.callback);
    } catch (e) {
        yield put(addCategoryFail(e));
        yield delay(2000);
        yield put(clearAddCategoryError());
    }
}

export const runAddCategory = (
    data: {
        name: string;
        colorId: string;
    },
    callback: () => void,
) => {
    return {
        type: ADD_CATEGORY,
        payload: {
            data,
            callback,
        },
    };
};

export const addCategoryRequest = () => {
    return {
        type: ADD_SERVICE_CATEGORY_REQUEST,
    };
};
export const addCategorySuccess = (data: { data: ICategory; message: string }) => {
    return {
        type: ADD_SERVICE_CATEGORY_SUCCESS,
        payload: {
            data: {
                _id: data.data._id,
                name: data.data.name,
                colorId: data.data.colorId,
            },

            message: data.message,
        },
    };
};
export const clearAddCategorySuccess = () => {
    return { type: CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS };
};
export const addCategoryFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: SERVICE_CATEGORY_ADD_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};

export const clearAddCategoryError = () => {
    return { type: CLEAR_SERVICE_CATEGORY_ADD_FAIL };
};
