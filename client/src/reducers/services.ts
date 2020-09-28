import { IstateService } from "../pages/Services/types";
import { ServiceActionTypes } from "../pages/Services/types";

import {
  ADD_SERVIC_REQUEST,
  ADD_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
  ADD_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_ADD_FAIL,
} from "../constants";

export const initialState: IstateService = {
  categoryIsAdded: false,
  categoryAddIsFail: false,
  categoryAdded: false,
  categoryAddError: false,

  servicesList: [],
  serviceIsAdded: false,
  serviceAdded: false,
  serviceMessageSuccess: "",
  serviceMessageFail: "",
};

const stateServices = (
  state: IstateService = initialState,
  action: ServiceActionTypes
) => {
  switch (action.type) {
    case ADD_SERVIC_REQUEST:
      return { ...state, serviceIsAdded: true, serviceAdded: false };
    case ADD_SERVIC_SUCCESS:
      return {
        ...state,
        serviceIsAdded: false,
        serviceAdded: true,
        servicesList: [...state.servicesList, action.payload.data],
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_MESSAGE_SERVIC_ADD_SUCCESS:
      return {
        ...state,
        serviceMessageSuccess: "",
      };
    case ADD_SERVIC_FAIL:
      return { ...state, serviceMessageFail: action.payload.message };
    case CLEAR_MESSAGE_SERVIC_ADD_FAIL:
      return { ...state, serviceMessageFail: "" };
    default:
      return state;
  }
};

export default stateServices;
