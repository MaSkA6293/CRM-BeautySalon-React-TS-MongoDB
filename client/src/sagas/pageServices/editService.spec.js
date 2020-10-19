import {
  editService,
  editServiceRequest,
  editServiceSuccess,
  clearEditServiceSuccess,
  editServiceFail,
  clearEditServiceError,
} from "./editService";
import {
  EDIT_SERVIC_REQUEST,
  EDIT_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS,
  EDIT_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_EDIT_FAIL,
} from "../../constants";
import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga editService", () => {
  const action = { payload: { data: { id: "1" }, callback: () => {} } };
  const saga = editService(action);
  let output = null;
  it("should put action editServiceRequest", () => {
    output = saga.next().value;
    let expected = put(editServiceRequest());
    expect(output).toEqual(expected);
  });
  it("should call api", (done) => {
    output = saga.next().value;
    done();
    let expected = call(
      httpRequest,
      "api/services",
      "PUT",
      action.payload.data
    );
    expect(output).toEqual(expected);
  });
  it("test should put editServiceSuccess", () => {
    const response = { data: [] };
    output = saga.next(response).value;
    let expected = put(editServiceSuccess(response.data));
    expect(output).toEqual(expected);
  });
  it("should delay(3000)", () => {
    expect(saga.next().value).toEqual(delay(3000));
  });
  it("should put clearSuccess message ", () => {
    output = saga.next().value;
    let expected = put(clearEditServiceSuccess());
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

describe("Tests error editService", () => {
  const action = { payload: { data: { id: "1" }, callback: () => {} } };
  const sagaError = editService(action);
  let output = null;
  it("throw error", () => {
    const error = {
      response: { data: { message: "error" } },
    };
    sagaError.next();
    sagaError.next();
    output = sagaError.throw(error).value;
    let expected = put(editServiceFail(error));
    expect(output).toEqual(expected);
  });
  it("should delay(2000)", () => {
    expect(sagaError.next().value).toEqual(delay(2000));
  });

  it("should put clear error", () => {
    output = sagaError.next().value;
    let expected = put(clearEditServiceError());
    expect(output).toEqual(expected);
  });
  it("should end", () => {
    output = sagaError.next().done;
    let expected = true;
    expect(output).toBe(expected);
  });
});

describe("Services action edit", () => {
  it("editServiceRequest", () => {
    const actions = editServiceRequest();
    const expectActions = {
      type: EDIT_SERVIC_REQUEST,
    };
    expect(actions).toEqual(expectActions);
  });
  it("editServiceSuccess", () => {
    const data = {
      data: {},
      message: "Success",
    };
    const actions = editServiceSuccess(data);
    const expectActions = {
      type: EDIT_SERVIC_SUCCESS,
      payload: { data: data.data, message: data.message },
    };

    expect(actions).toEqual(expectActions);
  });
  it("clearEditServiceSuccess", () => {
    const actions = clearEditServiceSuccess();
    const expectActions = { type: CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS };
    expect(actions).toEqual(expectActions);
  });
  it("editServiceFail", () => {
    const error = { response: { data: { message: "some error" } } };
    const actions = editServiceFail(error);
    const expectActions = {
      type: EDIT_SERVIC_FAIL,
      payload: { message: error.response.data.message },
    };
    expect(actions).toEqual(expectActions);
  });
  it("clearEditServiceError", () => {
    const actions = clearEditServiceError();
    const expectActions = { type: CLEAR_MESSAGE_SERVIC_EDIT_FAIL };
    expect(actions).toEqual(expectActions);
  });
});
