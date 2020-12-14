import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { runEditService } from "../actionCreators/editService";
import { editService } from "./editService";
import { editServiceRequest, editServiceSuccess, editServiceError } from "../actionCreators/editService";

import { clearMessageServices } from "../actionCreators";

describe("editServiceSaga Saga", () => {
    const action = runEditService([], () => undefined);
    const saga = editService(action);
    let output = null;
    it("should put editServiceRequest", () => {
        output = saga.next().value;
        let expected = put(editServiceRequest());
        expect(output).toEqual(expected);
    });
    it("should call  api/services, PUT", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, "api/services", "PUT", action.payload.data);
        done();
        expect(output).toEqual(expected);
    });
    it("should put addServiceSuccess", () => {
        const services = { data: [] };
        output = saga.next(services).value;
        let expected = put(editServiceSuccess(services.data));
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

describe("tests Error editServiceSaga saga", () => {
    const action = runEditService([], () => undefined);
    const sagaError = editService(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(editServiceError(error));
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
    it("test addServiceRequest", () => {
        const output = editServiceRequest();
        const expected = { type: ServicesActionsType.EDIT_SERVICE_REQUEST };
        expect(output).toEqual(expected);
    });
    it("test editServiceSuccess", () => {
        const response = { data: [], message: "" };
        const output = editServiceSuccess(response);
        const expected = {
            type: ServicesActionsType.EDIT_SERVICE_SUCCESS,
            payload: { data: response.data, message: response.message },
        };
        expect(output).toEqual(expected);
    });

    it("editServiceError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = editServiceError(error);
        const expectActions = {
            type: ServicesActionsType.EDIT_SERVICE_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
