import { call, delay, put } from "redux-saga/effects";
import {
  EDIT_CATEGORY,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS,
  EDIT_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_EDIT_FAIL,
} from "../../constants";
import { httpRequest } from "../../utils/network";
import { ICategory } from "../../pages/Services/types";

export function* editCategory(action: {
  payload: {
    data: {
      _id: string;
      name: string;
      colorId: string;
    };
    callback: () => void;
  };
}) {
  try {
    yield put(editCategoryRequest());
    const response = yield call(
      httpRequest,
      "api/services/categories",
      "PUT",
      action.payload.data
    );
    yield put(editCategorySuccess(response.data));
    yield delay(3000);
    yield put(clearEditCategorySuccess());
    yield call(action.payload.callback);
  } catch (e) {
    yield put(editCategoryFail(e));
    yield delay(2000);
    yield put(clearEditCategoryError());
  }
}

export const runEditCategory = (
  data: {
    _id: string;
    name: string;
    colorId: string;
  },
  callback: () => void
) => {
  return {
    type: EDIT_CATEGORY,
    payload: { data, callback },
  };
};

export const editCategoryRequest = () => {
  return {
    type: EDIT_CATEGORY_REQUEST,
  };
};

export const editCategorySuccess = (data: {
  data: ICategory;
  message: string;
}) => {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    payload: { data: data.data, message: data.message },
  };
};

export const clearEditCategorySuccess = () => {
  return { type: CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS };
};

export const editCategoryFail = (e: {
  response: { data: { message: string } };
}) => {
  return {
    type: EDIT_CATEGORY_FAIL,
    payload: {
      message: e.response.data.message
        ? e.response.data.message
        : '"Что-то пошло не так, попробуйте снова"',
    },
  };
};
export const clearEditCategoryError = () => {
  return { type: CLEAR_MESSAGE_CATEGORY_EDIT_FAIL };
};
