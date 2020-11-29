import { UserActionsType } from "../contracts/actionTypes";
interface IUserClearMessage {
    type: typeof UserActionsType.CLEAR_USER_MESSAGE;
}
export const userClearMessage = (): IUserClearMessage => {
    return { type: UserActionsType.CLEAR_USER_MESSAGE };
};
