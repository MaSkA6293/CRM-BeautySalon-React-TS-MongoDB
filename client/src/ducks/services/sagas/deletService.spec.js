import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { runDeletService } from "../actionCreators/deletService";
import { deletService } from "./deletService";
import { deletServiceRequest, deletServiceSuccess, deletServiceError } from "../actionCreators/deletService";

import { clearMessageServices } from "../actionCreators";

describe("deletServiceSaga Saga", () => {
    const action = runDeletService("", () => undefined);
    const saga = deletService(action);
    let output = null;
    it("should put deletServiceRequest", () => {
        output = saga.next().value;
        let expected = put(deletServiceRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/services, DELETE", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, "api/services", "DELETE", {
            _id: action.payload._id,
        });
        done();
        expect(output).toEqual(expected);
    });
    it("should put addServiceSuccess", () => {
        const services = { data: [] };
        output = saga.next(services).value;
        let expected = put(deletServiceSuccess(services.data));
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
    it("should put clearMessageServices", () => {
        output = saga.next().value;
        let expected = put(clearMessageServices());
        expect(output).toEqual(expected);
    });

    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests Error addNewServiceSaga saga", () => {
    const action = runDeletService("", () => undefined);
    const sagaError = deletService(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(deletServiceError(error));
        expect(output).toEqual(expected);
    });
    it("should delay(2000)", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should put clearMessageServices", () => {
        output = sagaError.next().value;
        let expected = put(clearMessageServices());
        expect(output).toEqual(expected);
    });
});

describe("tests action fetchServicePageData", () => {
    it("test deletServiceRequest", () => {
        const output = deletServiceRequest();
        const expected = { type: ServicesActionsType.DELET_SERVICE_REQUEST };
        expect(output).toEqual(expected);
    });
    it("test deletServiceSuccess", () => {
        const response = { _id: "", message: "" };
        const output = deletServiceSuccess(response);
        const expected = {
            type: ServicesActionsType.DELET_SERVICE_SUCCESS,
            payload: { _id: response._id, message: response.message },
        };
        expect(output).toEqual(expected);
    });

    it("deletServiceError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = deletServiceError(error);
        const expectActions = {
            type: ServicesActionsType.DELET_SERVICE_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
