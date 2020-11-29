import { UserActionsType } from "../contracts/actionTypes";

export const userSignOut = () => {
    return {
        type: UserActionsType.SIGN_OUT,
    };
};
export const runSignOut = () => {
    return {
        type: UserActionsType.USER_SIGN_OUT,
    };
};
