import { UserActionsType } from "../contracts/actionTypes";
import { User } from "../contracts/state";
export const signInFail = (error: { response: { data: { message: string } } }) => {
    return {
        type: UserActionsType.SIGNIN_FAIL,
        payload: {
            message: error.response.data.message
                ? error.response.data.message
                : "Что-то пошло не так, попробуйте снова",
        },
    };
};

export const setUser = (token: string, refresh_token: string) => {
    localStorage.setItem(
        "userData",
        JSON.stringify({
            token,
            refresh_token,
            expires_in: Date.now() + 60 * 60 * 1000,
        }),
    );
};

export const runSignIn = (data: { email: string; password: string }) => {
    return {
        type: UserActionsType.USER_SIGNIN,
        payload: data,
    };
};

export const signInRequest = () => {
    return { type: UserActionsType.SIGNIN_REQUEST };
};

export const signInClearMessage = () => {
    return { type: UserActionsType.CLEAR_SIGNIN_MESSAGE };
};

export const signInSuccess = (user: User) => {
    return {
        type: UserActionsType.SIGNIN_SUCCESS,
        payload: user,
    };
};
