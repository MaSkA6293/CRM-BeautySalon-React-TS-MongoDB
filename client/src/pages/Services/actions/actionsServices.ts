import { Dispatch } from "redux";

import { httpRequest, check401 } from "../../../utils/network";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY,
  ADD_SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
  COLORS_REQUEST,
  COLORS_REQUEST_SUCCESS,
  COLORS_REQUEST_FAIL,
  CLEAR_ERROR_REQUEST_COLORS_FAIL,
} from "../../../constants";
export const addCategory = (
  data: {
    name: string;
    comment: string;
    color: string;
  },
  callback: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_SERVICE_CATEGORY_REQUEST,
    });

    httpRequest("servicess", "POST", data)
      .then((res: any) => {
        if (res.data.status === "OK") {
          dispatch({ type: ADD_SERVICE_CATEGORY, payload: res.data.data });
          dispatch({ type: ADD_SERVICE_CATEGORY_SUCCESS });
          callback();
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err) => {
        check401(err);
        dispatch({
          type: SERVICE_CATEGORY_ADD_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_SERVICE_CATEGORY_ADD_FAIL });
        }, 2000);
      });
  };
};

export const getColors = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: COLORS_REQUEST });
    httpRequest("api/color", "GET")
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch({
            type: COLORS_REQUEST_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        check401(err);
        dispatch({
          type: COLORS_REQUEST_FAIL,
          payload: { message: err.response.data.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_REQUEST_COLORS_FAIL });
        }, 2000);
      });
  };
};
