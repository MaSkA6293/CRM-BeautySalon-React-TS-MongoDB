import { call, all, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
    SERVICE_PAGE_REQUEST,
    COLORS_REQUEST_SUCCESS,
    GET_SERVICES_AND_CATEGORIES_REQUEST_SUCCESS,
    GET_SERVICES_AND_CATEGORIES_REQUEST_ERROR,
    CLEAR_ERROR_REQUEST_FAIL,
} from "../../constants";

import { IColor } from "../../types/typesColors";
import { ICategory, IService } from "../../pages/Services/types";

export function* fetchServicePageData(): Generator<any, any, any> {
    try {
        const [categories, colors, services] = yield all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
            call(httpRequest, "api/services", "GET"),
        ]);
        yield put(colorsRequestSuccess(colors));
        yield put(servicesAndCategoriesSuccess(services, categories));
    } catch (e) {
        yield put(requestError());
        yield delay(4000);
        yield put(clearErrorRequest());
    }
}

export const servicPageRequest = () => {
    return { type: SERVICE_PAGE_REQUEST };
};

export const colorsRequestSuccess = (colors: { data: IColor[] }) => {
    return {
        type: COLORS_REQUEST_SUCCESS,
        payload: colors.data,
    };
};

export const servicesAndCategoriesSuccess = (services: { data: IService[] }, categories: { data: ICategory[] }) => {
    return {
        type: GET_SERVICES_AND_CATEGORIES_REQUEST_SUCCESS,
        payload: { services: services.data, categories: categories.data },
    };
};

export const requestError = () => {
    return {
        type: GET_SERVICES_AND_CATEGORIES_REQUEST_ERROR,
        payload: { message: "Ошибка получения данных с сервера" },
    };
};

export const clearErrorRequest = () => {
    return { type: CLEAR_ERROR_REQUEST_FAIL };
};
