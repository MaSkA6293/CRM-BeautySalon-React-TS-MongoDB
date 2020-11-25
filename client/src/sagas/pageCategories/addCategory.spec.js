import {
    runAddCategory,
    addCategory,
    addCategoryRequest,
    addCategorySuccess,
    clearAddCategorySuccess,
    addCategoryFail,
    clearAddCategoryError,
} from "./addCategory";
import {
    ADD_CATEGORY,
    ADD_SERVICE_CATEGORY_REQUEST,
    ADD_SERVICE_CATEGORY_SUCCESS,
    CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS,
    SERVICE_CATEGORY_ADD_FAIL,
    CLEAR_SERVICE_CATEGORY_ADD_FAIL,
} from "../../constants";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga addCategory", () => {
    const action = { payload: { data: { _id: "1" } } };
    const saga = addCategory(action);
    let output = null;
    it("should put addCategoryRequest", () => {
        output = saga.next().value;
        let expected = put(addCategoryRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/services", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services/categories", "POST", action.payload.data);
        expect(output).toEqual(expected);
    });
    it("test should put addServiceSuccess", () => {
        const response = { data: { data: [], message: "" } };
        output = saga.next(response).value;
        let expected = put(addCategorySuccess(response.data));
        expect(output).toEqual(expected);
    });
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });
    it("should put clearSuccess message ", () => {
        output = saga.next().value;
        let expected = put(clearAddCategorySuccess());
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

describe("test addCategory Error", () => {
    const action = { payload: { data: { _id: "1" } } };
    const sagaError = addCategory(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addCategoryFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(clearAddCategoryError());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test addCategory actions", () => {
    it("runAddService", () => {
        const data = {};
        const actions = runAddCategory(data, callback);
        const expectActions = { type: ADD_CATEGORY, payload: { data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("addCategoryRequest", () => {
        const actions = addCategoryRequest();
        const expectActions = {
            type: ADD_SERVICE_CATEGORY_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("addCategorySuccess", () => {
        const data = {
            data: { _id: "id", name: "name", colorId: "2" },
            message: "message",
        };
        const actions = addCategorySuccess(data);
        const expectActions = {
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
        expect(actions).toEqual(expectActions);
    });
    it("clearAddCategorySuccess", () => {
        const actions = clearAddCategorySuccess();
        const expectActions = { type: CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS };
        expect(actions).toEqual(expectActions);
    });
    it("addCategoryFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = addCategoryFail(error);
        const expectActions = {
            type: SERVICE_CATEGORY_ADD_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
    it("clearAddCategoryError", () => {
        const actions = clearAddCategoryError();
        const expectActions = { type: CLEAR_SERVICE_CATEGORY_ADD_FAIL };
        expect(actions).toEqual(expectActions);
    });
});
