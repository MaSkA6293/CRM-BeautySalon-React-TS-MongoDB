import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
  DELET_CATEGORY_REQUEST,
  DELET_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS,
  DELET_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_DELET_FAIL,
  DELET_CATEGORY,
} from "../../constants";

export function* deletCategory(action: {
  payload: { _id: string; callback: () => void };
}) {
  try {
    yield put(deletCategoryRequest());
    const response = yield call(
      httpRequest,
      "api/services/categories",
      "DELETE",
      { _id: action.payload._id }
    );
    yield put(deletCategorySuccess(response.data));
    yield delay(3000);
    yield put(clearDeletCategorySuccess());
    yield call(action.payload.callback);
  } catch (e) {
    yield put(deletCategoryFail(e));
    yield delay(2000);
    yield put(clearDeletCategoryError());
  }
}

export const rundDeletCategory = (_id: string, callback: () => void) => {
  return {
    type: DELET_CATEGORY,
    payload: { _id: _id, callback: callback },
  };
};

export const deletCategoryRequest = () => {
  return {
    type: DELET_CATEGORY_REQUEST,
  };
};
export const deletCategorySuccess = (data: {
  _id: string;
  message: string;
}) => {
  return {
    type: DELET_CATEGORY_SUCCESS,
    payload: { _id: data._id, message: data.message },
  };
};

export const clearDeletCategorySuccess = () => {
  return { type: CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS };
};

export const deletCategoryFail = (e: {
  response: { data: { message: string } };
}) => {
  return {
    type: DELET_CATEGORY_FAIL,
    payload: {
      message: e.response.data.message
        ? e.response.data.message
        : '"Что-то пошло не так, попробуйте снова"',
    },
  };
};
export const clearDeletCategoryError = () => {
  return { type: CLEAR_MESSAGE_CATEGORY_DELET_FAIL };
};
