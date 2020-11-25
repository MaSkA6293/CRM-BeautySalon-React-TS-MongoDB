import {
    rundDeletService,
    deletServic,
    deletServiceRequest,
    deletServiceSuccess,
    clearDeletServiceSuccess,
    deletServiceFail,
    clearDeletServiceError,
} from "./deletService";
import {
    DELET_SERVICE,
    DELET_SERVIC_REQUEST,
    DELET_SERVIC_SUCCESS,
    CLEAR_MESSAGE_SERVIC_DELET_SUCCESS,
    DELET_SERVIC_FAIL,
    CLEAR_MESSAGE_SERVIC_DELET_FAIL,
} from "../../constants";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga deletService", () => {
    const action = { payload: { _id: "1" } };
    const saga = deletServic(action);
    let output = null;
    it("should put deletServiceRequest", () => {
        output = saga.next().value;
        let expected = put(deletServiceRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/services", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services", "DELETE", {
            _id: action.payload._id,
        });
        expect(output).toEqual(expected);
    });
    it("test should put deletServiceSuccess", () => {
        const response = { statusText: "OK", data: [] };
        output = saga.next(response).value;
        let expected = put(deletServiceSuccess(response.data));
        expect(output).toEqual(expected);
    });

    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });
    it("should put clearSuccess message ", () => {
        output = saga.next().value;
        let expected = put(clearDeletServiceSuccess());
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

describe("test deletService Error", () => {
    const action = { payload: { data: { _id: "1" } } };
    const sagaError = deletServic(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(deletServiceFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(clearDeletServiceError());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test deletService actions", () => {
    it("rundDeletService", () => {
        const _id = "1";
        const actions = rundDeletService(_id, callback);
        const expectActions = { type: DELET_SERVICE, payload: { _id, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("deletServiceRequest", () => {
        const actions = deletServiceRequest();
        const expectActions = {
            type: DELET_SERVIC_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("deletServiceSuccess", () => {
        const data = { _id: "id", message: "message" };
        const actions = deletServiceSuccess(data);
        const expectActions = {
            type: DELET_SERVIC_SUCCESS,
            payload: { _id: data._id, message: data.message },
        };
        expect(actions).toEqual(expectActions);
    });
    it("clearDeletServiceSuccess", () => {
        const actions = clearDeletServiceSuccess();
        const expectActions = { type: CLEAR_MESSAGE_SERVIC_DELET_SUCCESS };
        expect(actions).toEqual(expectActions);
    });
    it("deletServiceFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = deletServiceFail(error);
        const expectActions = {
            type: DELET_SERVIC_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
    it("clearDeletServiceError", () => {
        const actions = clearDeletServiceError();
        const expectActions = { type: CLEAR_MESSAGE_SERVIC_DELET_FAIL };
        expect(actions).toEqual(expectActions);
    });
});
