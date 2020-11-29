import { ClientsActionsType } from "../contracts/actionTypes";
import { IClient } from "../contracts/state";

export const getClientsRequest = (): IGetClientsRequest => {
    return { type: ClientsActionsType.CLIENTS_REQUEST };
};

export const clientsRequestSuccess = (response: IClientsRequestSuccessProps): IClientsRequestSuccess => {
    return {
        type: ClientsActionsType.CLIENTS_REQUEST_SUCCESS,
        payload: response.data,
    };
};

export const clientsRequestFail = (err: IClientsRequestFailProps): IClientsRequestFail => {
    return {
        type: ClientsActionsType.CLIENTS_REQUEST_FAIL,
        payload: err.response.data.message ? err.response.data.message : "Что-то пошло не так, попробуйте снова",
    };
};

interface IClientsRequestSuccess {
    type: typeof ClientsActionsType.CLIENTS_REQUEST_SUCCESS;
    payload: IClient[];
}
interface IClientsRequestSuccessProps {
    data: IClient[];
}
interface IClientsRequestFailProps {
    response: { data: { message: string } };
}
interface IClientsRequestFail {
    type: typeof ClientsActionsType.CLIENTS_REQUEST_FAIL;
    payload: string;
}
interface IGetClientsRequest {
    type: typeof ClientsActionsType.CLIENTS_REQUEST;
}
