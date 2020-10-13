import { call, put, delay } from "redux-saga/effects";
import { httpRequest } from "../utils/network";
import {
  CLIENTS_REQUEST_SUCCESS,
  CLIENTS_REQUEST_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
} from "../constants";
import { IClient } from "../types/typesClients";

export function* fetchClients() {
  try {
    const response = yield call(httpRequest, "api/client", "GET");
    if (response.statusText === "OK") {
      yield put(clientsRequestSuccess(response));
    }
  } catch (err) {
    yield put(clientsRequestFail(err));
    yield delay(4000);
    yield put(clientsRequestClearFail());
  }
}

export const clientsRequestClearFail = () => {
  return { type: CLEAR_ERROR_REQUEST_FAIL }
}

export const clientsRequestSuccess = (response: { data: IClient[] }) => {
  return {
    type: CLIENTS_REQUEST_SUCCESS,
    payload: response.data,
  }
}

export const clientsRequestFail = (err: {
  response: { data: { message: string } }
}) => {
  return {
    type: CLIENTS_REQUEST_FAIL,
    payload: err.response.data.message
      ? err.response.data.message
      : "Что-то пошло не так, попробуйте снова",
  }
}
