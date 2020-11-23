import { UserActionsType } from '../contracts/actionTypes'
import { User } from '../contracts/state'
export const runGetUser = () => {
    return {
        type: UserActionsType.GET_USER,
    };
};

interface GetUserSuccess {
    data: User
}
export const getUserSuccess = (data: GetUserSuccess) => {
    return {
        type: UserActionsType.GET_USER_SUCCESS,
        payload: data
    }
}