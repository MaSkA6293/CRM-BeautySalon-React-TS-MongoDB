import { UserActionsType } from "../contracts/actionTypes";

export const runSignUp = (data: { email: string; password: string; confirmPassword: string }, cb: () => void) => {
    return {
        type: UserActionsType.USER_SIGNUP,
        payload: { data, cb },
    };
};
export const signUpRequest = () => {
    return { type: UserActionsType.SIGNUP_REQUEST };
};

export const signUpSuccess = (message: string) => {
    return {
        type: UserActionsType.SIGNUP_SUCCESS,
        payload: { message },
    };
};

export const signUpFail = (e: { response: { data: { message: string } } }) => {
    return {
        type: UserActionsType.SIGNUP_FAIL,
        payload: { message: e.response.data.message },
    };
};
