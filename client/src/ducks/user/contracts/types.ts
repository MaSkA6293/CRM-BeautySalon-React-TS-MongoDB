import { UserActionsType } from "./actionTypes";

export interface ISignUp {
    type: UserActionsType.USER_SIGNUP;
    payload: { data: { email: string; password: string; confirmPassword: string }; cb: () => void };
}
export interface ISignIn {
    type: typeof UserActionsType.USER_SIGNIN;
    payload: { data: { email: string; password: string } };
}
