import {
  deletCategory,
  rundDeletCategory,
  deletCategoryRequest,
  deletCategorySuccess,
  clearDeletCategorySuccess,
  deletCategoryFail,
  clearDeletCategoryError,
} from "./deletCategory";
import {
  DELET_CATEGORY_REQUEST,
  DELET_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS,
  DELET_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_DELET_FAIL,
  DELET_CATEGORY,
} from "../../constants";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga deletCategory", () => {
  const action = { payload: { _id: "1", callback: () => {} } };
  const saga = deletCategory(action);
  let output = null;
  it("should put deletCategoryRequest", () => {
    output = saga.next().value;
    let expected = put(deletCategoryRequest());
    expect(output).toEqual(expected);
  });
  it("should call api/services/categories", (done) => {
    output = saga.next().value;
    done();
    let expected = call(httpRequest, "api/services/categories", "DELETE", {
      _id: action.payload._id,
    });
    expect(output).toEqual(expected);
  });
  it("test should put deletCategorySuccess", () => {
    const response = { statusText: "OK", data: [] };
    output = saga.next(response).value;
    let expected = put(deletCategorySuccess(response.data));
    expect(output).toEqual(expected);
  });

  it("should delay 3000", () => {
    output = saga.next().value;
    let expected = delay(3000);
    expect(output).toEqual(expected);
  });
  it("should put clearSuccess message ", () => {
    output = saga.next().value;
    let expected = put(clearDeletCategorySuccess());
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

describe("test deletCategoryFail Error", () => {
  const action = { payload: { data: { _id: "1" }, callback: () => {} } };
  const sagaError = deletCategory(action);
  let output = null;
  it("test error", () => {
    const error = {
      response: { data: { message: "error" } },
    };
    sagaError.next();
    sagaError.next();
    output = sagaError.throw(error).value;
    let expected = put(deletCategoryFail(error));
    expect(output).toEqual(expected);
  });
  it("should delay 2000", () => {
    output = sagaError.next().value;
    let expected = delay(2000);
    expect(output).toEqual(expected);
  });
  it("should clear error", () => {
    output = sagaError.next().value;
    let expected = put(clearDeletCategoryError());
    expect(output).toEqual(expected);
  });
  it("should end", () => {
    output = sagaError.next().done;
    let expected = true;
    expect(output).toBe(expected);
  });
});

describe("test deletService actions", () => {
  it("rundDeletCategory", () => {
    const _id = "1";
    const callback = () => {};
    const actions = rundDeletCategory(_id, callback);
    const expectActions = { type: DELET_CATEGORY, payload: { _id, callback } };
    expect(actions).toEqual(expectActions);
  });
  it("deletCategoryRequest", () => {
    const actions = deletCategoryRequest();
    const expectActions = {
      type: DELET_CATEGORY_REQUEST,
    };
    expect(actions).toEqual(expectActions);
  });
  it("deletCategorySuccess", () => {
    const data = { _id: "id", message: "message" };
    const actions = deletCategorySuccess(data);
    const expectActions = {
      type: DELET_CATEGORY_SUCCESS,
      payload: { _id: data._id, message: data.message },
    };
    expect(actions).toEqual(expectActions);
  });
  it("clearDeletCategorySuccess", () => {
    const actions = clearDeletCategorySuccess();
    const expectActions = { type: CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS };
    expect(actions).toEqual(expectActions);
  });
  it("deletCategoryFail", () => {
    const error = { response: { data: { message: "some error" } } };
    const actions = deletCategoryFail(error);
    const expectActions = {
      type: DELET_CATEGORY_FAIL,
      payload: {
        message: error.response.data.message
          ? error.response.data.message
          : '"Что-то пошло не так, попробуйте снова"',
      },
    };
    expect(actions).toEqual(expectActions);
  });
  it("clearDeletCategoryError", () => {
    const actions = clearDeletCategoryError();
    const expectActions = { type: CLEAR_MESSAGE_CATEGORY_DELET_FAIL };
    expect(actions).toEqual(expectActions);
  });
});
