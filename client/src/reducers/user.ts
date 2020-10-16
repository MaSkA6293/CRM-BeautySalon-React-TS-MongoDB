import { UserActionTypes, IstateUser } from "../pages/AuthPage/types";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_SIGNUP_MESSAGE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  CLEAR_SIGNIN_MESSAGE,
  SIGN_OUT,
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
  userCreateSuccess: "",
};
const stateUser = (
  state: IstateUser = initialState,
  action: UserActionTypes
) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        userIsLoading: true,
        userLoaded: false,
        userCreateSuccess: "",
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userIsLoading: false,
        userLoaded: true,
        userCreateSuccess: action.payload.message,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        userIsLoading: false,
        userGetIsFail: true,
        userGetError: action.payload.message,
      };

    case CLEAR_SIGNUP_MESSAGE:
      return {
        ...state,
        userGetIsFail: false,
        userGetError: "",
        userCreateSuccess: "",
      };

    case SIGNIN_REQUEST:
      return {
        ...state,
        userIsLogining: true,
        userIsLogined: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        userIsLogining: false,
        userIsLogined: true,
        userData: action.payload,
        userReady:true
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        userIsLogining: false,
        userLoginIsFail: true,
        userLoginError: action.payload.message,
      };

    case CLEAR_SIGNIN_MESSAGE:
      return {
        ...state,
        userLoginIsFail: false,
        userLoginError: "",
      };
    case SIGN_OUT:
      return {
        ...state,
        userData: { token: "", id: "" },
        userIsLogined:false,
        userReady:true
      };
    case USER_READY:
      return { ...state, userReady: action.payload };
    default:
      return state;
  }
};

export default stateUser;
