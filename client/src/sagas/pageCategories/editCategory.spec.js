import {
    runEditCategory,
    editCategory,
    editCategoryRequest,
    editCategorySuccess,
    clearEditCategorySuccess,
    editCategoryFail,
    clearEditCategoryError,
} from "./editCategory";
import {
    EDIT_CATEGORY,
    EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS,
    EDIT_CATEGORY_FAIL,
    CLEAR_MESSAGE_CATEGORY_EDIT_FAIL,
} from "../../constants";
import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga editCategory", () => {
    const action = { payload: { data: { id: "1" } } };
    const saga = editCategory(action);
    let output = null;
    it("should put action editCategoryRequest", () => {
        output = saga.next().value;
        let expected = put(editCategoryRequest());
        expect(output).toEqual(expected);
    });
    it("should call api", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services/categories", "PUT", action.payload.data);
        expect(output).toEqual(expected);
    });
    it("test should put editCategorySuccess", () => {
        const response = { data: [] };
        output = saga.next(response).value;
        let expected = put(editCategorySuccess(response.data));
        expect(output).toEqual(expected);
    });
    it("should delay(3000)", () => {
        expect(saga.next().value).toEqual(delay(3000));
    });
    it("should put clearEditCategorySuccess ", () => {
        output = saga.next().value;
        let expected = put(clearEditCategorySuccess());
        expect(output).toEqual(expected);
    });
    it("should call callback", () => {
        output = saga.next().value;
        let expected = call(action.payload.callback);
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("Tests error editCategory", () => {
    const action = { payload: { data: { id: "1" } } };
    const sagaError = editCategory(action);
    let output = null;
    it("throw error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(editCategoryFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay(2000)", () => {
        expect(sagaError.next().value).toEqual(delay(2000));
    });

    it("should put clear error", () => {
        output = sagaError.next().value;
        let expected = put(clearEditCategoryError());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("Tests action edit", () => {
    it("runEditCategory", () => {
        const data = {
            _id: "string",
            name: "string",
            colorId: "string",
        };
        const actions = runEditCategory(data, callback);
        const expectActions = { type: EDIT_CATEGORY, payload: { data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("editCategoryRequest", () => {
        const actions = editCategoryRequest();
        const expectActions = {
            type: EDIT_CATEGORY_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("editCategorySuccess", () => {
        const data = {
            data: {},
            message: "Success",
        };
        const actions = editCategorySuccess(data);
        const expectActions = {
            type: EDIT_CATEGORY_SUCCESS,
            payload: { data: data.data, message: data.message },
        };

        expect(actions).toEqual(expectActions);
    });
    it("clearEditCategorySuccess", () => {
        const actions = clearEditCategorySuccess();
        const expectActions = { type: CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS };
        expect(actions).toEqual(expectActions);
    });
    it("editCategoryFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = editCategoryFail(error);
        const expectActions = {
            type: EDIT_CATEGORY_FAIL,
            payload: { message: error.response.data.message },
        };
        expect(actions).toEqual(expectActions);
    });
    it("clearEditCategoryError", () => {
        const actions = clearEditCategoryError();
        const expectActions = { type: CLEAR_MESSAGE_CATEGORY_EDIT_FAIL };
        expect(actions).toEqual(expectActions);
    });
});
