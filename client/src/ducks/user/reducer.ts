import { UserActionsType, UserActions } from "./contracts/actionTypes";
import { IstateUser } from "./contracts/state";
import { UserStatus } from "./contracts/state";
export const initialState: IstateUser = {
    userIsLoading: false,
    userMessageSuccess: "",
    userMessageError: "",
    userIsLogining: false,
    userData: undefined,
    statusUser: UserStatus.NOT_READY,
};

export const UserReducer = (state: IstateUser = initialState, action: UserActions): IstateUser => {
    switch (action.type) {
        case UserActionsType.SIGNUP_REQUEST:
            return {
                ...state,
                userIsLoading: true,
            };
        case UserActionsType.SIGNUP_SUCCESS:
            return {
                ...state,
                userIsLoading: false,
                userMessageSuccess: action.payload.message,
            };
        case UserActionsType.SIGNUP_FAIL:
            return {
                ...state,
                userIsLoading: false,
                userMessageError: action.payload.message,
            };

        case UserActionsType.CLEAR_USER_MESSAGE:
            return {
                ...state,
                userMessageError: "",
                userMessageSuccess: "",
            };

        case UserActionsType.SIGNIN_REQUEST:
            return {
                ...state,
                userIsLogining: true,
            };
        case UserActionsType.SIGNIN_SUCCESS:
            return {
                ...state,
                userIsLogining: false,
                userData: action.payload,
            };
        case UserActionsType.SIGNIN_FAIL:
            return {
                ...state,
                userIsLogining: false,
                userMessageError: action.payload.message,
            };

        case UserActionsType.SIGN_OUT:
            return {
                ...state,
                userData: undefined,
                userIsLogining: false,
                userIsLoading: false,
                statusUser: UserStatus.READY,
            };
        case UserActionsType.GET_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                statusUser: UserStatus.READY,

                userIsLogining: false,
            };
        default:
            return state;
    }
};

export default UserReducer;
