import { UserActionsType, UserActions } from "./contracts/actionTypes";
import { IstateUser } from "./contracts/state";

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

export const UserReducer = (
    state: IstateUser = initialState,
    action: UserActions
) => {
    switch (action.type) {
        case UserActionsType.SIGNUP_REQUEST:
            return {
                ...state,
                userIsLoading: true,
                userLoaded: false,
                userCreateSuccess: "",
            };
        case UserActionsType.SIGNUP_SUCCESS:
            return {
                ...state,
                userIsLoading: false,
                userLoaded: true,
                userCreateSuccess: action.payload.message,
            };
        case UserActionsType.SIGNUP_FAIL:
            return {
                ...state,
                userIsLoading: false,
                userGetIsFail: true,
                userGetError: action.payload.message,
            };

        case UserActionsType.CLEAR_SIGNUP_MESSAGE:
            return {
                ...state,
                userGetIsFail: false,
                userGetError: "",
                userCreateSuccess: "",
            };

        case UserActionsType.SIGNIN_REQUEST:
            return {
                ...state,
                userIsLogining: true,
                userIsLogined: false,
            };
        case UserActionsType.SIGNIN_SUCCESS:
            return {
                ...state,
                userIsLogining: false,
                userIsLogined: true,
                userData: action.payload,
                userReady: true,
            };
        case UserActionsType.SIGNIN_FAIL:
            return {
                ...state,
                userIsLogining: false,
                userLoginIsFail: true,
                userLoginError: action.payload.message,
            };

        case UserActionsType.CLEAR_SIGNIN_MESSAGE:
            return {
                ...state,
                userLoginIsFail: false,
                userLoginError: "",
            };
        case UserActionsType.SIGN_OUT:
            return {
                ...state,
                userData: { token: "", id: "" },
                userIsLogined: false,
                userReady: true,
            };
        case UserActionsType.USER_READY:
            return { ...state, userReady: action.payload };
        default:
            return state;
    }
};

export default UserReducer;
