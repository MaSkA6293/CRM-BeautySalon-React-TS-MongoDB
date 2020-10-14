import { httpRequest } from "../../utils/network"
import { ICategory } from "../../pages/Services/types"
import { call, delay, put, all } from "redux-saga/effects";
import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_REQUEST_SUCCESS,
    GET_CATEGORIES_REQUEST_FAIL,
    CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL,
    CATEGORY_PAGE_REQUEST,
    COLORS_REQUEST_SUCCESS
} from "../../constants"
import { IColor } from "../../types/typesColors";


export function* fetchCategoryPageData(): Generator<any, any, any> {
    try {
        const [categories, colors] = yield all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET")
        ]);
        yield put(getCategoriesRequestSuccess(categories.data));
        yield put(getColorsRequestSuccess(colors.data));
    } catch (e) {
        yield put(fetchFail(e));
        yield delay(2000);
        yield put(clearFetchFailError());
    }
}

export const getColorsRequestSuccess = (data: IColor[]) => {
    return {
        type: COLORS_REQUEST_SUCCESS,
        payload: data,
    }
}

export const runFetchCategoryPageData = () => {
    return { type: CATEGORY_PAGE_REQUEST }
}


export const getCategoriesRequest = () => {
    return { type: GET_CATEGORIES_REQUEST };
};
export const getCategoriesRequestSuccess = (data: ICategory[]) => {
    return {
        type: GET_CATEGORIES_REQUEST_SUCCESS,
        payload: data,
    };
};

export const fetchFail = (e: {
    response: { data: { message: string } };
}) => {
    return {
        type: GET_CATEGORIES_REQUEST_FAIL,
        payload: {
            message: e.response.data.message
                ? e.response.data.message
                : '"Что-то пошло не так, попробуйте снова"',
        },
    };
};
export const clearFetchFailError = () => {
    return { type: CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL };
};
