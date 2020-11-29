import { UserActionsType } from "../contracts/actionTypes";
import { User } from "../contracts/state";

interface ISignInFail {
    type: typeof UserActionsType.SIGNIN_FAIL;
    payload: {
        message: string;
    };
}

export const signInFail = (error: { response: { data: { message: string } } }): ISignInFail => {
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

type signInProps = {
    email: string;
    password: string;
};
interface IRunSignIn {
    type: typeof UserActionsType.USER_SIGNIN;
    payload: signInProps;
}
export const runSignIn = (data: signInProps): IRunSignIn => {
    return {
        type: UserActionsType.USER_SIGNIN,
        payload: data,
    };
};

interface ISignInRequest {
    type: typeof UserActionsType.SIGNIN_REQUEST;
}

export const signInRequest = (): ISignInRequest => {
    return { type: UserActionsType.SIGNIN_REQUEST };
};

interface ISignInSuccess {
    type: typeof UserActionsType.SIGNIN_SUCCESS;
    payload: User;
}
export const signInSuccess = (user: User): ISignInSuccess => {
    return {
        type: UserActionsType.SIGNIN_SUCCESS,
        payload: user,
    };
};
