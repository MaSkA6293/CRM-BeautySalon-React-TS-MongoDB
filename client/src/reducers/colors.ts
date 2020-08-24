import {
  COLORS_REQUEST,
  COLORS_REQUEST_SUCCESS,
  COLORS_REQUEST_FAIL,
  CLEAR_ERROR_REQUEST_COLORS_FAIL,
} from "../constants";
import { IstateColors } from "../types/typesColors";

const initialState: IstateColors = {
  colorsLoaded: false,
  colorsIsLoading: false,
  colorsGetIsFail: false,
  colorsGetError: "",
  colorsList: [],
};

const stateColors = (state: IstateColors = initialState, action: any) => {
  switch (action.type) {
    case COLORS_REQUEST:
      return {
        ...state,
        colorsIsLoading: true,
        colorsLoaded: false,
        colorsList: [],
      };
    case COLORS_REQUEST_SUCCESS:
      return {
        ...state,
        colorsIsLoading: false,
        colorsLoaded: true,
        colorsList: action.payload,
      };
    case COLORS_REQUEST_FAIL:
      return {
        ...state,
        colorsIsLoading: false,
        colorsGetIsFail: true,
        colorsGetError: action.payload.message,
      };

    case CLEAR_ERROR_REQUEST_COLORS_FAIL:
      return {
        ...state,
        colorsGetIsFail: false,
        colorsGetError: "",
      };

    default:
      return state;
  }
};

export default stateColors;
