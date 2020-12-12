import { CategoriesActionsType } from "../contracts/actionTypes";
import { clearMessageCategories } from "../actionCreators";
import {
    runEditCategory,
    editCategoryRequest,
    editCategorySuccess,
    editCategoryError,
} from "../actionCreators/editCategory";
import { editCategory } from "./editCategory";

import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga addCategory", () => {
    const action = runEditCategory({ _id: "", name: "", colorId: "" }, () => undefined);
    const saga = editCategory(action);
    let output = null;
    it("should put editCategoryRequest", () => {
        output = saga.next().value;
        let expected = put(editCategoryRequest());
        expect(output).toEqual(expected);
    });
    it("should call  api/services/categories,PUT", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services/categories", "PUT", action.payload.data);
        expect(output).toEqual(expected);
    });
    it("test should put editCategorySuccess", () => {
        const response = { data: { data: { _id: "", name: "", colorId: "" } }, message: "" };
        output = saga.next(response).value;
        let expected = put(editCategorySuccess(response.data));
        expect(output).toEqual(expected);
    });
    it("should call callback", () => {
        output = saga.next().value;
        let expected = call(action.payload.callback);
        expect(output).toEqual(expected);
    });
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });
    it("should put clearSuccess message ", () => {
        output = saga.next().value;
        let expected = put(clearMessageCategories());
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test editCategoryFail Error", () => {
    const action = runEditCategory({}, () => undefined);
    const sagaError = editCategory(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(editCategoryError(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
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

describe("test deletService actions", () => {
    it("runEditCategory", () => {
        const data = {
            _id: "",
            name: "",
            colorId: "",
        };
        const callback = () => undefined;
        const actions = runEditCategory(data, callback);
        const expectActions = { type: CategoriesActionsType.EDIT_CATEGORY, payload: { data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("editCategoryRequest", () => {
        const actions = editCategoryRequest();
        const expectActions = {
            type: CategoriesActionsType.EDIT_CATEGORY_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("editCategorySuccess", () => {
        const data = { data: { _id: "", name: "", colorId: "" }, message: "" };
        const actions = editCategorySuccess(data);
        const expectActions = {
            type: CategoriesActionsType.EDIT_CATEGORY_SUCCESS,
            payload: {
                data: {
                    _id: data.data._id,
                    name: data.data.name,
                    colorId: data.data.colorId,
                },
                message: data.message,
            },
        };
        expect(actions).toEqual(expectActions);
    });

    it("editCategoryError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = editCategoryError(error);
        const expectActions = {
            type: CategoriesActionsType.EDIT_CATEGORY_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
