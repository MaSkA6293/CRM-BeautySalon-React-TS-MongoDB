import { Dispatch } from "redux";

import { httpRequest } from "../../../utils/network";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS,
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
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS,
  EDIT_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_EDIT_FAIL,
  DELET_CATEGORY_REQUEST,
  DELET_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS,
  DELET_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_DELET_FAIL
} from "../../../constants";
import { IService, ICategory } from "../types";





export const addCategory = (
  data: {
    name: string;
    colorId: string;
  },
  callback: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch(addCategoryRequest());
    httpRequest("api/services/categories", "POST", data)
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch(addCategorySuccess(res.data));
          setTimeout(() => {
            dispatch(clearAddCategorySuccess());
            callback();
          }, 3000);
        }
      })
      .catch((err) => {
        dispatch(addCategoryFail(err));
        setTimeout(() => {
          dispatch(clearAddCategoryError());
        }, 2000);
      });
  };
};

export const editCategory = (
  data: {
    _id: string;
    name: string;
    colorId: string;
  },
  callback: () => void
) => {
  return (dispatch: Dispatch) => {
    dispatch(editCategoryRequest());
    httpRequest("api/services/categories", "PUT", data)
      .then((res: any) => {
        if (res.statusText === "OK") {
          dispatch(editCategorySuccess(res.data));
          setTimeout(() => {
            dispatch(clearEditCategorySuccess());
            callback();
          }, 3000);
        }
      })
      .catch((e) => {
        dispatch(editCategoryFail(e));
        setTimeout(() => {
          dispatch(clearEditCategoryError());
        }, 2000);
      });
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

export const deletCategory = (_id: string, callback: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch(deletCategoryRequest());
    httpRequest("api/services/categories", "DELETE", { _id })
      .then((res) => {
        if (res.statusText === "OK") {
          dispatch(deletCategorySuccess(res.data));
          setTimeout(() => {
            dispatch(clearDeletCategorySuccess());
            callback();
          }, 3000);
        }
      })
      .catch((err) => {
        dispatch(deletCategoryFail(err));
        setTimeout(() => {
          dispatch(clearDeletCategoryError());
        }, 2000);
      });
  };
};

//delet
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

// export const editService = (
//   data: {
//     _id: string;
//     name: string;
//     duration: number[];
//     cost: number;
//     colorId: string;
//     categoriesId: string[];
//   },
//   callback: () => void
// ) => {
//   return (dispatch: Dispatch) => {
//     dispatch(editServiceRequest());
//     httpRequest("api/services", "PUT", data)
//       .then((res: any) => {
//         if (res.statusText === "OK") {
//           dispatch(editServiceSuccess(res.data));
//           setTimeout(() => {
//             dispatch(clearEditServiceSuccess());
//             callback();
//           }, 3000);
//         }
//       })
//       .catch((e) => {
//         dispatch(editServiceFail(e));
//         setTimeout(() => {
//           dispatch(clearEditServiceError());
//         }, 2000);
//       });
//   };
// };


//delet
//edit

// add
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

export const addCategoryRequest = () => {
  return {
    type: ADD_SERVICE_CATEGORY_REQUEST,
  };
};
export const addCategorySuccess = (data: {
  data: ICategory;
  message: string;
}) => {
  return {
    type: ADD_SERVICE_CATEGORY_SUCCESS,
    payload: {
      data: {
        _id: data.data._id,
        name: data.data.name,
        colorId: data.data.colorId,
      },

      message: data.message,
    },
  };
};
export const clearAddCategorySuccess = () => {
  return { type: CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS };
};
export const addCategoryFail = (e: {
  response: { data: { message: string } };
}) => {
  return {
    type: SERVICE_CATEGORY_ADD_FAIL,
    payload: {
      message: e.response.data.message
        ? e.response.data.message
        : '"Что-то пошло не так, попробуйте снова"',
    },
  };
};

export const clearAddCategoryError = () => {
  return { type: CLEAR_SERVICE_CATEGORY_ADD_FAIL };
};
