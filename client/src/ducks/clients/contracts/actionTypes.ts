import { IClient } from "./state";
export enum ClientsActionsType {
    ADD_CLIENT = "clients/ADD_CLIENT",
    ADD_CLIENT_REQUEST = "clients/ADD_CLIENT_REQUEST",
    ADD_CLIENT_SUCCESS = "clients/ADD_CLIENT_SUCCESS",
    CLIENT_ADD_FAIL = "clients/CLIENT_ADD_FAILCLIENT_ADD_FAIL",

    EDIT_CLIENT = "clients/EDIT_CLIENT",
    EDIT_CLIENT_REQUEST = "clients/EDIT_CLIENT_REQUEST",
    EDIT_CLIENT_SUCCESS = "clients/EDIT_CLIENT_SUCCESS",
    EDIT_CLIENT_FAIL = "clients/EDIT_CLIENT_FAIL",

    DELET_CLIENT = "clients/DELET_CLIENT",
    DELET_CLIENT_REQUEST = "clients/DELET_CLIENT_REQUEST",
    DELET_CLIENT_SUCCESS = "clients/DELET_CLIENT_SUCCESS",
    CLIENT_DELET_FAIL = "clients/CLIENT_DELET_FAIL",

    CLIENTS_REQUEST = "clients/CLIENTS_REQUEST",
    CLIENTS_REQUEST_SUCCESS = "clients/CLIENTS_REQUEST_SUCCESS",
    CLIENTS_REQUEST_FAIL = "clients/CLIENTS_REQUEST_FAIL",

    CLEAR_MESSAGE_CLIENT = "clients/CLEAR_MESSAGE_CLIENT",
}

// for all
interface IClearMessageClients {
    type: typeof ClientsActionsType.CLEAR_MESSAGE_CLIENT;
}

// add new client
interface IAddClientActionRequest {
    type: typeof ClientsActionsType.ADD_CLIENT_REQUEST;
}
interface IAddClientActionAdd {
    type: typeof ClientsActionsType.ADD_CLIENT_SUCCESS;
    payload: { client: IClient; message: string };
}
interface IAddClientActionFail {
    type: typeof ClientsActionsType.CLIENT_ADD_FAIL;
    payload: { message: string };
}

// edit client
interface IEditClientActionRequest {
    type: typeof ClientsActionsType.EDIT_CLIENT_REQUEST;
}
interface IEditClientActionSuccess {
    type: typeof ClientsActionsType.EDIT_CLIENT_SUCCESS;
    payload: { data: IClient; message: string };
}
interface IEditClientsFail {
    type: typeof ClientsActionsType.EDIT_CLIENT_FAIL;
    payload: { message: string };
}

// delet client
interface IDeletClientActionRequest {
    type: typeof ClientsActionsType.DELET_CLIENT_REQUEST;
}
interface IDeletClientActionSuccess {
    type: typeof ClientsActionsType.DELET_CLIENT_SUCCESS;
    payload: { _id: string; message: string };
}
interface IDeletClientActionFail {
    type: typeof ClientsActionsType.CLIENT_DELET_FAIL;
    payload: { message: string };
}

// all clients
interface IIsFetchingClientAction {
    type: typeof ClientsActionsType.CLIENTS_REQUEST;
}
interface IRequestClientsSuccess {
    type: typeof ClientsActionsType.CLIENTS_REQUEST_SUCCESS;
    payload: IClient[];
}
interface IRequestClientsFail {
    type: typeof ClientsActionsType.CLIENTS_REQUEST_FAIL;
    payload: Error;
}

export type ClientsAction =
    | IAddClientActionRequest
    | IAddClientActionAdd
    | IEditClientActionRequest
    | IEditClientActionSuccess
    | IEditClientsFail
    | IIsFetchingClientAction
    | IRequestClientsSuccess
    | IDeletClientActionRequest
    | IDeletClientActionSuccess
    | IDeletClientActionFail
    | IRequestClientsFail
    | IAddClientActionFail
    | IClearMessageClients;
