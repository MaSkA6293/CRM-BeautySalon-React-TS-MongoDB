import { ServicesActionsType } from "../contracts/actionTypes";
import { IClearMessageServices } from "../contracts/actionTypes";

export const clearMessageServices = (): IClearMessageServices => {
    return {
        type: ServicesActionsType.SERVICES_CLEAR_MESSAGE,
    };
};
