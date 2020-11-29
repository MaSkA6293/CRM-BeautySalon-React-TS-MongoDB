import { IClient, IClientValues } from "../../clients/contracts/state";
import { ClientsActionsType } from "../contracts/actionTypes";

interface IRunAddClient {
    type: ClientsActionsType.ADD_CLIENT;
    payload: {
        client: IClientValues;
        callback: () => void;
    };
}
export const runAddClient = (client: IClientValues, callback: () => void): IRunAddClient => {
    return {
        type: ClientsActionsType.ADD_CLIENT,
        payload: {
            client,
            callback,
        },
    };
};
interface IAddClientRequest {
    type: typeof ClientsActionsType.ADD_CLIENT_REQUEST;
}
export const addClientRequest = (): IAddClientRequest => {
    return {
        type: ClientsActionsType.ADD_CLIENT_REQUEST,
    };
};

interface IAddClientSuccess {
    type: ClientsActionsType.ADD_CLIENT_SUCCESS;
    payload: {
        client: IClient;
        message: string;
    };
}
export const addClientSuccess = (response: { client: IClient; message: string }): IAddClientSuccess => {
    return {
        type: ClientsActionsType.ADD_CLIENT_SUCCESS,
        payload: {
            client: response.client,
            message: response.message,
        },
    };
};

interface IAddClientFail {
    type: ClientsActionsType.CLIENT_ADD_FAIL;
    payload: {
        message: string;
    };
}
interface IAddClientFailProps {
    response: { data: { message: string } };
}

export const addClientFail = (e: IAddClientFailProps): IAddClientFail => {
    return {
        type: ClientsActionsType.CLIENT_ADD_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
