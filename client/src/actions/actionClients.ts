import {
  ADD_CLIENT_REQUEST,
  ADD_CLIENT,
  CLIENT_ADD_FAIL,
  EDIT_CLIENT,
  EDIT_CLIENT_REQUEST,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL,
  CLEAR_ERROR_EDIT_FAIL,
  DELET_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_REQUEST_SUCCESS,
  ADD_CLIENT_SUCCESS,
  CLIENTS_REQUEST_FAIL,
  DELET_CLIENT_REQUEST,
  DELET_CLIENT_SUCCESS,
  CLIENT_DELET_FAIL,
  CLEAR_ERROR_DELET_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
  CLEAR_ERROR_CLIENT_ADD_FAIL,
} from "../constants";
import { Dispatch } from "redux";
import { IClient } from "../types/typesClients";

import { httpRequest } from "../utils/network";

export const getClients = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CLIENTS_REQUEST });
    httpRequest("clients", "GET")
      .then((res: any) => {
        console.log(res);
        if (res.data.status === "OK") {
          setTimeout(() => {
            dispatch({
              type: CLIENTS_REQUEST_SUCCESS,
              payload: res.data.result,
            });
          }, 1000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err: Error) => {
        dispatch({
          type: CLIENTS_REQUEST_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_REQUEST_FAIL });
        }, 5000);
      });
  };
};

export const editClient = (data: IClient, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: EDIT_CLIENT_REQUEST });
    httpRequest(`clients/${data._id}`, "PUT", data)
      .then((res) => {
        if (res.data.status === "OK") {
          setTimeout(() => {
            dispatch({
              type: EDIT_CLIENT,
              payload: { data: res.data.data },
            });
            setTimeout(() => {
              dispatch({ type: EDIT_CLIENT_SUCCESS });
              callback();
            }, 5000);
          }, 5000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err: Error) => {
        dispatch({
          type: EDIT_CLIENT_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_EDIT_FAIL });
        }, 5000);
      });
  };
};
export const deletClient = (_id: number, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: DELET_CLIENT_REQUEST,
    });

    httpRequest(`clients/${_id}`, "DELETE")
      .then((res) => {
        if (res.data.status === "OK") {
          setTimeout(() => {
            dispatch({
              type: DELET_CLIENT,
              payload: { _id: res.data.id },
            });
            setTimeout(() => {
              dispatch({ type: DELET_CLIENT_SUCCESS });
              callback();
            }, 10000);
          }, 4000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err: Error) => {
        dispatch({
          type: CLIENT_DELET_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_DELET_FAIL });
        }, 5000);
      });
  };
};

export const addClient = (
  data: {
    name: string;
    female: string;
    phone: string;
  },
  callback: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_CLIENT_REQUEST,
    });

    httpRequest("clients", "POST", data)
      .then((res: any) => {
        if (res.data.status === "OK") {
          setTimeout(() => {
            dispatch({ type: ADD_CLIENT, payload: res.data.data });
            setTimeout(() => {
              dispatch({ type: ADD_CLIENT_SUCCESS });
              callback();
            }, 5000);
          }, 5000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err: Error) => {
        dispatch({ type: CLIENT_ADD_FAIL, payload: { message: err.message } });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_CLIENT_ADD_FAIL });
        }, 5000);
      });
  };
};
