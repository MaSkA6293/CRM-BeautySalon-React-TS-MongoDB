import { Dispatch } from "redux";

import { httpRequest } from "../../../utils/network";
import {
    COLORS_REQUEST,
    COLORS_REQUEST_SUCCESS,
    COLORS_REQUEST_FAIL,
    CLEAR_ERROR_REQUEST_COLORS_FAIL,
    GET_SERVICES_REQUEST,
    GET_SERVICES_REQUEST_SUCCESS,
    GET_SERVICES_REQUEST_FAIL,
    CLEAR_ERROR_GET_SERVICES_REQUEST_FAIL,
} from "../../../constants";

//delet
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
