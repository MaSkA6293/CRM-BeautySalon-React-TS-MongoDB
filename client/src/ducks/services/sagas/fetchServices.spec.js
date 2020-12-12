import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { runFetchServices } from "../actionCreators/fetchServices";
import { fetchServices } from "./fetchServices";
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesError } from "../actionCreators/fetchServices";

import { clearMessageServices } from "../actionCreators";

describe("fetchServices Saga", () => {
    const action = runFetchServices();
    const saga = fetchServices(action);
    let output = null;
    it("should put fetchServicesRequest", () => {
        output = saga.next().value;
        let expected = put(fetchServicesRequest());
        expect(output).toEqual(expected);
    });
    it("should call  api/services, GET", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, "api/services", "GET");
        done();
        expect(output).toEqual(expected);
    });
    it("should put fetchServicesSuccess", () => {
        const services = { data: [] };
        output = saga.next(services).value;
        let expected = put(fetchServicesSuccess(services));
        expect(output).toEqual(expected);
    });
    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests Error fetchServices saga", () => {
    const action = runFetchServices();
    const sagaError = fetchServices(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(fetchServicesError(error));
        expect(output).toEqual(expected);
    });
    it("should delay(4000)", () => {
        output = sagaError.next().value;
        let expected = delay(4000);
        expect(output).toEqual(expected);
    });
    it("should put clearMessageServices", () => {
        output = sagaError.next().value;
        let expected = put(clearMessageServices());
        expect(output).toEqual(expected);
    });
});

describe("tests action fetchServicePageData", () => {
    it("test fetchServicesRequest", () => {
        const output = fetchServicesRequest();
        const expected = { type: ServicesActionsType.FETCH_SERVICES_REQUEST };
        expect(output).toEqual(expected);
    });
    it("test fetchServicesSuccess", () => {
        const services = { data: [] };
        const output = fetchServicesSuccess(services);
        const expected = {
            type: ServicesActionsType.FETCH_SERVICES_SUCCESS,
            payload: services.data,
        };
        expect(output).toEqual(expected);
    });

    it("fetchServicesError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = fetchServicesError(error);
        const expectActions = {
            type: ServicesActionsType.FETCH_SERVICES_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
