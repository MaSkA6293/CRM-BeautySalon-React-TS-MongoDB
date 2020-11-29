import { clientsRequestSuccess, clientsRequestFail } from "../actionCreators/fetchClients";
import { fetchClients } from "./fetchClients";

import { ClientsActionsType } from "../contracts/actionTypes";
import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

import { clientsClearMessage } from "../actionCreators";

describe("FetchClients Saga", () => {
    const saga = fetchClients();
    let output = null;
    const url = "api/client";
    const method = "GET";
    it("should call httpRequest", (done) => {
        output = saga.next().value;
        let expected = call(httpRequest, url, method);
        done();
        expect(output).toEqual(expected);
    });
    it("should put clientsRequestSuccess", () => {
        const response = {
            data: [],
        };
        output = saga.next(response).value;
        let expected = put(clientsRequestSuccess(response));
        expect(output).toEqual(expected);
    });
    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("Saga fetchClients test err, message exists", () => {
    const sagaError = fetchClients();
    let outputError = null;
    it("should payload:error.response.data.message ", () => {
        sagaError.next();
        const error = { response: { data: { message: "some err" } } };
        outputError = sagaError.throw(error).value;
        let expected = put(clientsRequestFail(error));
        expect(outputError).toEqual(expected);
    });
    it("should delay 4000", () => {
        expect(sagaError.next().value).toEqual(delay(4000));
    });
    it("should put clientsRequestClearFail", () => {
        outputError = sagaError.next().value;
        let expected = put(clientsClearMessage());
        expect(outputError).toEqual(expected);
    });
    it("should return done=true", function () {
        outputError = sagaError.next().done;
        let expected = true;
        expect(outputError).toEqual(expected);
    });
});

describe("Saga fetchClients test err, message not exists", () => {
    const sagaError = fetchClients();
    let output = null;
    it("should break on error, message not exists", (done) => {
        sagaError.next().value;
        done();
        const error = { response: { data: { message: "" } } };
        output = sagaError.throw(error).value;
        let expected = put(clientsRequestFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 4000", () => {
        expect(sagaError.next().value).toEqual(delay(4000));
    });
    it("should clear message", () => {
        const output = sagaError.next().value;
        let expected = put(clientsClearMessage());
        expect(output).toEqual(expected);
    });
    it("should return done=true", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests actions fetchClients", () => {
    let output = null;
    it("clientsRequestSuccess", () => {
        let response = { data: [] };
        output = clientsRequestSuccess(response);
        let expected = {
            type: ClientsActionsType.CLIENTS_REQUEST_SUCCESS,
            payload: response.data,
        };
        expect(output).toEqual(expected);
    });
    it("clientsRequestFail", () => {
        let err = { response: { data: { message: "err" } } };
        output = clientsRequestFail(err);
        let expected = {
            type: ClientsActionsType.CLIENTS_REQUEST_FAIL,
            payload: err.response.data.message ? err.response.data.message : "Что-то пошло не так, попробуйте снова",
        };
        expect(output).toEqual(expected);
    });
});
