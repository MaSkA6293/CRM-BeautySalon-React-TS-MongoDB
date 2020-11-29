import { ClientsActionsType } from "../contracts/actionTypes";

export const clientsClearMessage = (): IClientsClearMessage => {
    return { type: ClientsActionsType.CLEAR_MESSAGE_CLIENT };
};
interface IClientsClearMessage {
    type: typeof ClientsActionsType.CLEAR_MESSAGE_CLIENT;
}
