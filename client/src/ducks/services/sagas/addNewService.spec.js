import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { runAddNewService } from "../actionCreators/addNewService";
import { addService } from "./addNewService";
import { addServiceRequest, addServiceSuccess, addServiceError } from "../actionCreators/addNewService";

import { clearMessageServices } from "../actionCreators";
import { runAddCategory } from "../../categories/actionCreators/addCategory";

describe("addNewServiceSaga Saga", () => {
    const action = runAddNewService([], () => undefined);
    const saga = addService(action);
    let output = null;
    it("should put addServiceRequest", () => {
        output = saga.next().value;
        let expected = put(addServiceRequest());
        expect(output).toEqual(expected);
    });
    it("should call  api/services, POST", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, "api/services", "POST", action.payload.data);
        done();
        expect(output).toEqual(expected);
    });
    it("should put addServiceSuccess", () => {
        const services = { data: [] };
        output = saga.next(services).value;
        let expected = put(addServiceSuccess(services.data));
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
    const action = runAddCategory([], () => undefined);
    const sagaError = addService(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addServiceError(error));
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
        const output = addServiceRequest();
        const expected = { type: ServicesActionsType.ADD_NEW_SERVICE_REQUEST };
        expect(output).toEqual(expected);
    });
    it("test addServiceSuccess", () => {
        const response = { data: [], message: "" };
        const output = addServiceSuccess(response);
        const expected = {
            type: ServicesActionsType.ADD_NEW_SERVICE_SUCCESS,
            payload: { data: response.data, message: response.message },
        };
        expect(output).toEqual(expected);
    });

    it("addServiceError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = addServiceError(error);
        const expectActions = {
            type: ServicesActionsType.ADD_NEW_SERVICE_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
