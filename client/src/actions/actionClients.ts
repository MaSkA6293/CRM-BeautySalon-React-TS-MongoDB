import {
  EDIT_CLIENT,
  EDIT_CLIENT_REQUEST,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL,
  CLEAR_ERROR_EDIT_FAIL,
  DELET_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_REQUEST_SUCCESS,
  CLIENTS_REQUEST_FAIL,
  DELET_CLIENT_REQUEST,
  DELET_CLIENT_SUCCESS,
  CLIENT_DELET_FAIL,
  CLEAR_ERROR_DELET_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
} from "../constants";
import { Dispatch } from "redux";
import { IClient } from "../types/typesClients";

import { httpRequest } from "../utils/network";

export const getClientsRequest = () => {
  return { type: CLIENTS_REQUEST };
};

export const getClients = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CLIENTS_REQUEST });
    httpRequest("api/client", "GET")
      .then((res: any) => {
        if (res.statusText === "OK") {
          setTimeout(() => {
            dispatch({
              type: CLIENTS_REQUEST_SUCCESS,
              payload: res.data,
            });
          }, 100);
        }
      })
      .catch((err) => {
        //  check401(err);
        dispatch({
          type: CLIENTS_REQUEST_FAIL,
          payload: { message: err.response.data.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_REQUEST_FAIL });
        }, 2000);
      });
  };
};

export const editClient = (data: IClient, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: EDIT_CLIENT_REQUEST });
    httpRequest(`api/client/${data._id}`, "PUT", data)
      .then((res) => {
        if (res.statusText === "OK") {
          setTimeout(() => {
            dispatch({
              type: EDIT_CLIENT,
              payload: { data: res.data },
            });
            setTimeout(() => {
              dispatch({ type: EDIT_CLIENT_SUCCESS });
              callback();
            }, 2000);
          }, 2000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err) => {
        //  check401(err);
        dispatch({
          type: EDIT_CLIENT_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_EDIT_FAIL });
        }, 2000);
      });
  };
};
export const deletClient = (_id: number, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: DELET_CLIENT_REQUEST,
    });

    httpRequest(`api/client/${_id}`, "DELETE")
      .then((res) => {
        if (res.statusText === "OK") {
          setTimeout(() => {
            dispatch({
              type: DELET_CLIENT,
              payload: { _id: res.data.id },
            });
            setTimeout(() => {
              dispatch({ type: DELET_CLIENT_SUCCESS });
              callback();
            }, 2000);
          }, 2000);
        } else {
          throw new Error(res.data.error);
        }
      })
      .catch((err) => {
        //  check401(err);
        dispatch({
          type: CLIENT_DELET_FAIL,
          payload: { message: err.message },
        });
        setTimeout(() => {
          dispatch({ type: CLEAR_ERROR_DELET_FAIL });
        }, 2000);
      });
  };
};

