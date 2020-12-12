import { CategoriesActionsType } from "../contracts/actionTypes";
import { clearMessageCategories } from "../actionCreators";
import {
    runAddCategory,
    addCategoryRequest,
    addCategorySuccess,
    addCategoryError,
} from "../actionCreators/addCategory";
import { addCategory } from "./addCategory";

import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga addCategory", () => {
    const action = runAddCategory({ name: "", colorId: "" }, () => undefined);
    const saga = addCategory(action);
    let output = null;
    it("should put addCategoryRequest", () => {
        output = saga.next().value;
        let expected = put(addCategoryRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/services/categories method POST", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services/categories", "POST", action.payload.data);
        expect(output).toEqual(expected);
    });
    it("test should put addCategorySuccess", () => {
        const response = { data: { data: { _id: "", name: "", colorId: "" } }, message: "" };
        output = saga.next(response).value;
        let expected = put(addCategorySuccess(response.data));
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

describe("test addCategoryFail Error", () => {
    const action = runAddCategory({}, () => undefined);
    const sagaError = addCategory(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addCategoryError(error));
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
    it("runAddCategory", () => {
        const data = {
            name: "",
            colorId: "",
        };
        const callback = () => undefined;
        const actions = runAddCategory(data, callback);
        const expectActions = { type: CategoriesActionsType.ADD_CATEGORY, payload: { data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("addCategoryRequest", () => {
        const actions = addCategoryRequest();
        const expectActions = {
            type: CategoriesActionsType.ADD_CATEGORY_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("deletCategorySuccess", () => {
        const data = { data: { _id: "", name: "", colorId: "" }, message: "" };
        const actions = addCategorySuccess(data);
        const expectActions = {
            type: CategoriesActionsType.ADD_CATEGORY_SUCCESS,
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

    it("deletCategoryError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = addCategoryError(error);
        const expectActions = {
            type: CategoriesActionsType.ADD_CATEGORY_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
