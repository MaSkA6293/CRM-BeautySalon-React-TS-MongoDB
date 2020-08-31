import { UserActionTypes, IstateUser } from "../pages/AuthPage/types";
import {
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAIL,
  CLEAR_USER_REQUEST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  CLEAR_LOGIN_FAIL,
  USER_LOGOOUT,
  USER_READY,
} from "../constants";

export const initialState: IstateUser = {
  userLoaded: false,
  userIsLoading: false,
  userGetIsFail: false,
  userGetError: "",
  userIsLogining: false,
  userIsLogined: false,
  userLoginIsFail: false,
  userLoginError: "",
  userData: { token: "", id: "" },
  userReady: false,
};
const stateUser = (
  state: IstateUser = initialState,
  action: UserActionTypes
) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        userIsLoading: true,
        userLoaded: false,
      };
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        userLoaded: true,
      };
    case USER_REQUEST_FAIL:
      return {
        ...state,
        userIsLoading: false,
        userGetIsFail: true,
        userGetError: action.payload.message,
      };

    case CLEAR_USER_REQUEST_FAIL:
      return {
        ...state,
        userGetIsFail: false,
        userGetError: "",
      };

    case USER_LOGIN_REQUEST:
      return {
        ...state,
        userIsLogining: true,
        userIsLogined: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userIsLogining: false,
        userIsLogined: true,
        userData: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        userIsLogining: false,
        userLoginIsFail: true,
        userLoginError: action.payload.message,
      };

    case CLEAR_LOGIN_FAIL:
      return {
        ...state,
        userLoginIsFail: false,
        userLoginError: "",
      };
    case USER_LOGOOUT:
      return {
        ...state,
        userData: { token: "", id: "" },
      };
    case USER_READY:
      return { ...state, userReady: action.payload };
    default:
      return state;
  }
};

export default stateUser;
