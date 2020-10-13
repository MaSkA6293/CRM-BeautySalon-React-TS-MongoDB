import {
  fetchClients,
  clientsRequestSuccess,
  clientsRequestFail,
  clientsRequestClearFail
} from "./fetchClients";
import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../utils/network";
import {
  CLIENTS_REQUEST_SUCCESS,
  CLIENTS_REQUEST_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
} from "../constants";


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
  it("should put clients request success", () => {
    const response = {
      statusText: "OK",
      data: [
        { _id: "1", name: "test1", female: "fTest1", phone: "999" }
      ],
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



describe("Saga fetchClients test err if statusText: 'not OK' message exists", () => {
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
  it("should clear message", () => {
    outputError = sagaError.next().value;
    let expected = put(clientsRequestClearFail());
    expect(outputError).toEqual(expected);
  });

  it("should return done=true", function () {
    outputError = sagaError.next().done;
    let expected = true;
    expect(outputError).toEqual(expected);
  });
});

describe("Saga fetchClients test err if statusText: 'not OK' message not exists", () => {
  const sagaError = fetchClients();
  let output = null;
  it('should break on error if statusText: "not OK" message not exists', (done) => {
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
    let expected = put(clientsRequestClearFail());
    expect(output).toEqual(expected);
  });
  it("should return done=true", () => {
    output = sagaError.next().done;
    let expected = true
    expect(output).toEqual(expected);
  });
});



describe("tests actions fetchClients", () => {
  let output = null;
  it("clientsRequestClearFail", () => {
    output = clientsRequestClearFail();
    let expected = { type: CLEAR_ERROR_REQUEST_FAIL }
    expect(output).toEqual(expected)
  })

  it("clientsRequestSuccess", () => {
    let response = { data: [] }
    output = clientsRequestSuccess(response);
    let expected = {
      type: CLIENTS_REQUEST_SUCCESS,
      payload: response.data,
    }
    expect(output).toEqual(expected)
  })

  it("clientsRequestFail", () => {
    let err = { response: { data: { message: 'err' } } }
    output = clientsRequestFail(err);
    let expected = {
      type: CLIENTS_REQUEST_FAIL,
      payload: err.response.data.message
        ? err.response.data.message
        : "Что-то пошло не так, попробуйте снова",
    }
    expect(output).toEqual(expected)
  })



})