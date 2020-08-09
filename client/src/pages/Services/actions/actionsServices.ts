import { Dispatch } from "redux";

import { httpRequest } from "../../../utils/network";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY,
  ADD_SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
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
          setTimeout(() => {
            dispatch({ type: ADD_SERVICE_CATEGORY, payload: res.data.data });
            setTimeout(() => {
              dispatch({ type: ADD_SERVICE_CATEGORY_SUCCESS });
              callback();
            }, 2000);
          }, 2000);
        } else {
          throw new Error(res.data.error);
        }
      })

      .catch((err: Error) => {
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