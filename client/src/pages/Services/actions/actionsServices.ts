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
  ADD_SERVIC_REQUEST,
  CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
  ADD_SERVIC_SUCCESS,
  ADD_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_ADD_FAIL,
  GET_SERVICES_REQUEST,
  GET_SERVICES_REQUEST_SUCCESS,
  GET_SERVICES_REQUEST_FAIL,
  CLEAR_ERROR_GET_SERVICES_REQUEST_FAIL,
} from "../../../constants";
import { IService } from "../types";
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

    httpRequest("services", "POST", data)
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

export const getServices = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_SERVICES_REQUEST });
    httpRequest("api/services", "GET")
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch({
            type: GET_SERVICES_REQUEST_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        check401(err);
        dispatch({
          type: GET_SERVICES_REQUEST_FAIL,
          payload: { message: err.response.data.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_GET_SERVICES_REQUEST_FAIL });
        }, 2000);
      });
  };
};

export const addService = (
  data: {
    name: string;
    duration: number[];
    cost: number;
    colorId: string;
    categoriesId: string[];
  },
  callback: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch(addServiceRequest());
    httpRequest("api/services", "POST", data)
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch(addServiceSuccess(res.data));
          setTimeout(() => {
            dispatch(clearAddServiceSuccess());
            callback();
          }, 3000);
        }
      })
      .catch((e) => {
        dispatch(addServiceFail(e));
        setTimeout(() => {
          dispatch(clearAddServiceError());
        }, 2000);
      });
  };
};
export const addServiceRequest = () => {
  return {
    type: ADD_SERVIC_REQUEST,
  };
};
export const addServiceSuccess = (data: {
  data: IService;
  message: string;
}) => {
  return {
    type: ADD_SERVIC_SUCCESS,
    payload: { data: data.data, message: data.message },
  };
};
export const clearAddServiceSuccess = () => {
  return { type: CLEAR_MESSAGE_SERVIC_ADD_SUCCESS };
};
export const addServiceFail = (e: {
  response: { data: { message: string } };
}) => {
  return {
    type: ADD_SERVIC_FAIL,
    payload: {
      message: e.response.data.message
        ? e.response.data.message
        : '"Что-то пошло не так, попробуйте снова"',
    },
  };
};

export const clearAddServiceError = () => {
  return { type: CLEAR_MESSAGE_SERVIC_ADD_FAIL };
};
