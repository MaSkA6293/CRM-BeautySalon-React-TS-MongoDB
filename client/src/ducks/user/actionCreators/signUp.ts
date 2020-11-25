import { UserActionsType } from "../contracts/actionTypes";

export const runSignUp = (data: { email: string; password: string; confirmPassword: string }) => {
    return {
        type: UserActionsType.USER_SIGNUP,
        payload: data,
    };
};
export const signUpRequest = () => {
    return { type: UserActionsType.SIGNUP_REQUEST };
};

export const signUpRequestSuccess = (message: string) => {
    return {
        type: UserActionsType.SIGNUP_SUCCESS,
        payload: { message },
    };
};

export const signUpRequestRequestFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: UserActionsType.SIGNUP_FAIL,
        payload: { message: e.response.data.message },
    };
};

export const signUpRequestClearMessage = () => {
    return { type: UserActionsType.CLEAR_SIGNUP_MESSAGE };
};
