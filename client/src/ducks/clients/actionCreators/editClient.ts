import { IClient } from "../../clients/contracts/state";
import { ClientsActionsType } from "../contracts/actionTypes";

interface IRunEditClient {
    type: ClientsActionsType.EDIT_CLIENT;
    payload: {
        client: IClient;
        callback: () => void;
    };
}
export const runEditClient = (client: IClient, callback: () => void): IRunEditClient => {
    return {
        type: ClientsActionsType.EDIT_CLIENT,
        payload: {
            client,
            callback,
        },
    };
};

interface IEditClientRequest {
    type: typeof ClientsActionsType.EDIT_CLIENT_REQUEST;
}

export const editClientRequest = (): IEditClientRequest => {
    return { type: ClientsActionsType.EDIT_CLIENT_REQUEST };
};
interface IEditClientSuccess {
    type: typeof ClientsActionsType.EDIT_CLIENT_SUCCESS;
    payload: { data: IClient; message: string };
}
export const editClientSuccess = (res: { userData: IClient; message: string }): IEditClientSuccess => {
    return {
        type: ClientsActionsType.EDIT_CLIENT_SUCCESS,
        payload: { data: res.userData, message: res.message },
    };
};

interface IEditClientFailProps {
    response: { data: { message: string } };
}
interface IEditClientFail {
    type: ClientsActionsType.EDIT_CLIENT_FAIL;
    payload: {
        message: string;
    };
}

export const editClientFail = (e: IEditClientFailProps): IEditClientFail => {
    return {
        type: ClientsActionsType.EDIT_CLIENT_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
