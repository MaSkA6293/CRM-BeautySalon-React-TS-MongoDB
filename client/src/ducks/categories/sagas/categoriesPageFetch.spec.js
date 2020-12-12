import { CategoriesActionsType } from "../contracts/actionTypes";
import { clearMessageCategories } from "../actionCreators";
import { runCategoriesPageFetch } from "../actionCreators/fetchCategoriesPage";
import {
    fetchCategoriesRequest,
    fetchCategoriesError,
    fetchCategoriesSuccess,
} from "../actionCreators/fetchCategories";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";
import { fetchCategoriesPage } from "./categoriesPageFetch";
import { call, delay, put, all } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga fetchCategoriesPage", () => {
    const action = runCategoriesPageFetch();
    const saga = fetchCategoriesPage(action);
    let output = null;
    it("should put fetchCategoriesRequest", () => {
        output = saga.next().value;
        let expected = put(fetchCategoriesRequest());
        expect(output).toEqual(expected);
    });
    it("should call colors,categories parallel", (done) => {
        output = saga.next().value;
        let expected = all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
        ]);
        done();
        expect(output).toEqual(expected);
    });
    it("should put fetchCategoriesSuccess", () => {
        const categories = { data: [] };
        const colors = { data: [] };
        output = saga.next([categories, colors]).value;
        let expected = put(fetchCategoriesSuccess(categories));
        expect(output).toEqual(expected);
    });
    it("should put fetchColorsSuccess", () => {
        const colors = { data: [] };
        output = saga.next().value;
        let expected = put(fetchColorsSuccess(colors));
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test addCategoryFail Error", () => {
    const action = runCategoriesPageFetch();
    const sagaError = fetchCategoriesPage(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(fetchCategoriesError(error));
        expect(output).toEqual(expected);
    });
    it("should delay 4000", () => {
        output = sagaError.next().value;
        let expected = delay(4000);
        expect(output).toEqual(expected);
    });
    it("should put clearSuccess message ", () => {
        output = sagaError.next().value;
        let expected = put(clearMessageCategories());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test categoriesPageFetch actions", () => {
    it("runCategoriesPageFetch", () => {
        const actions = runCategoriesPageFetch();
        const expectActions = { type: CategoriesActionsType.FETCH_CATEGORIES_PAGE };
        expect(actions).toEqual(expectActions);
    });
    it("fetchCategoriesRequest", () => {
        const actions = fetchCategoriesRequest();
        const expectActions = {
            type: CategoriesActionsType.FETCH_CATEGORIES_REQUEST,
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
