import { call, put, all, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_REQUEST_SUCCESS,
    GET_CATEGORIES_REQUEST_FAIL,
    CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL,
    COLORS_REQUEST_SUCCESS,
    CATEGORY_PAGE_REQUEST,
} from "../../constants";
import {
    getCategoriesRequest,
    getCategoriesRequestSuccess,
    fetchFail,
    clearFetchFailError,
    getColorsRequestSuccess,
    runFetchCategoryPageData,
    fetchCategoryPageData,
} from "./fetchCategoryPageData";

describe("fetchCategoryPageData Saga", () => {
    const saga = fetchCategoryPageData();
    let output = null;
    it("should call colors,categories parallel", (done) => {
        output = saga.next().value;
        let expected = all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
        ]);
        done();
        expect(output).toEqual(expected);
    });
    it("should put categories request success", () => {
        const colors = { data: [] };
        const categories = { data: [] };
        output = saga.next([categories, colors]).value;
        let expected = put(getCategoriesRequestSuccess(categories.data));
        expect(output).toEqual(expected);
    });

    it("should put colors request success", () => {
        const colors = { data: [] };
        output = saga.next().value;
        let expected = put(getColorsRequestSuccess(colors.data));
        expect(output).toEqual(expected);
    });
    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests Error fetchCategoryPageData Saga", () => {
    const sagaError = fetchCategoryPageData();
    let output = null;
    it("should break", () => {
        sagaError.next();
        let err = { response: { data: { message: "err" } } };
        output = sagaError.throw(err).value;
        let expected = put(fetchFail(err));
        expect(output).toEqual(expected);
    });

    it("should delay(2000)", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });

    it("should put clear error after delay", () => {
        output = sagaError.next().value;
        let expected = put(clearFetchFailError());
        expect(output).toEqual(expected);
    });
});

describe("Categories action get", () => {
    it("getColorsRequestSuccess", () => {
        const data = [];
        const actions = getColorsRequestSuccess(data);
        const expectActions = {
            type: COLORS_REQUEST_SUCCESS,
            payload: data,
        };
        expect(actions).toEqual(expectActions);
    });
    it("runFetchCategoryPageData", () => {
        const actions = runFetchCategoryPageData();
        const expectActions = { type: CATEGORY_PAGE_REQUEST };
        expect(actions).toEqual(expectActions);
    });
    it("getCategoriesRequest", () => {
        const actions = getCategoriesRequest();
        const expectActions = {
            type: GET_CATEGORIES_REQUEST,
        };

        expect(actions).toEqual(expectActions);
    });
    it("getCategoriesRequestSuccess", () => {
        const responsedata = [
            {
                _id: "1",
                name: "test name",
                colorId: "2",
            },
        ];
        const actions = getCategoriesRequestSuccess(responsedata);
        const expectActions = {
            type: GET_CATEGORIES_REQUEST_SUCCESS,
            payload: responsedata,
        };

        expect(actions).toEqual(expectActions);
    });
    it("fetchFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = fetchFail(error);
        const expectActions = {
            type: GET_CATEGORIES_REQUEST_FAIL,
            payload: { message: error.response.data.message },
        };

        expect(actions).toEqual(expectActions);
    });
    it("clearFetchFailError", () => {
        const actions = clearFetchFailError();
        const expectActions = { type: CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL };
        expect(actions).toEqual(expectActions);
    });
});
