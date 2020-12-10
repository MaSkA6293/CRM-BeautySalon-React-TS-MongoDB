import { httpRequest } from "../../../utils/network";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CategoriesActionsType } from "../contracts/actionTypes";
import { clearMessageCategories } from "../actionCreators";
import {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesError,
    runFetchCategories,
} from "../actionCreators/fetchCategories";
import { fetchCategories } from "./fetchCategories";

describe("fetchCategories Saga", () => {
    const action = runFetchCategories();
    const saga = fetchCategories(action);
    let output = null;
    it("should put fetchCategoriesRequest", () => {
        output = saga.next().value;
        let expected = put(fetchCategoriesRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/services/categories method GET", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, "api/services/categories", "GET");
        done();
        expect(output).toEqual(expected);
    });
    it("should put fetchCategoriesSuccess", () => {
        const categories = { response: { data: [] } };
        output = saga.next(categories).value;
        let expected = put(fetchCategoriesSuccess(categories));
        expect(output).toEqual(expected);
    });
    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests Error fetchCategoryPageData Saga", () => {
    const action = runFetchCategories();
    const sagaError = fetchCategories(action);
    let output = null;
    it("should break", () => {
        sagaError.next();
        let err = { response: { data: { message: "err" } } };
        output = sagaError.throw(err).value;
        let expected = put(fetchCategoriesError(err));
        expect(output).toEqual(expected);
    });

    it("should delay(2000)", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });

    it("should put clear error after delay", () => {
        output = sagaError.next().value;
        let expected = put(clearMessageCategories());
        expect(output).toEqual(expected);
    });
});

describe("fetchCategories actions", () => {
    it("runFetchCategories", () => {
        const actions = runFetchCategories();
        const expectActions = { type: CategoriesActionsType.FETCH_CATEGORIES };
        expect(actions).toEqual(expectActions);
    });
    it("fetchCategoriesSuccess", () => {
        const response = { data: [] };
        const actions = fetchCategoriesSuccess(response);
        const expectActions = {
            type: CategoriesActionsType.FETCH_CATEGORIES_SUCCESS,
            payload: response.data,
        };
        expect(actions).toEqual(expectActions);
    });

    it("fetchCategoriesError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = fetchCategoriesError(error);
        const expectActions = {
            type: CategoriesActionsType.FETCH_CATEGORIES_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
