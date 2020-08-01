import {
  ADD_CLIENT_REQUEST,
  EDIT_CLIENT_REQUEST,
  EDIT_CLIENT,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL,
  CLEAR_ERROR_EDIT_FAIL,
  DELET_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_REQUEST_SUCCESS,
  CLIENTS_REQUEST_FAIL,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT,
  DELET_CLIENT_REQUEST,
  DELET_CLIENT_SUCCESS,
  CLIENT_DELET_FAIL,
  CLEAR_ERROR_DELET_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
  CLIENT_ADD_FAIL,
  CLEAR_ERROR_CLIENT_ADD_FAIL,
} from "../constants";

export interface IClient {
  _id: number;
  name: string;
  female: string;
  phone: string;
}
export interface IClientValues {
  name: string;
  female: string;
  phone: string;
}
export interface IstateClients {
  readonly clientsIsLoading: boolean;
  readonly clientsLoaded: boolean;
  readonly clientGetIsFail: boolean;
  readonly clientGetError: string;
  readonly clientsList: IClient[];
  readonly clientIsAdded: boolean;
  readonly clientAdded: boolean;
  readonly clientAddIsFail: boolean;
  readonly clientAddError: string;
  readonly clientDeleted: boolean;
  readonly clientIsDeleting: boolean;
  readonly clientDeletIsFail: boolean;
  readonly clientDeletError: string;

  readonly clientEdited: boolean;
  readonly clientIsEditing: boolean;
  readonly clientEditIsFail: boolean;
  readonly clientEditError: string;
}
// add new Client
interface IAddClientActionRequest {
  type: typeof ADD_CLIENT_REQUEST;
}

interface IAddClientActionAdd {
  type: typeof ADD_CLIENT;
  payload: {
    _id: number;
    name: string;
    female: string;
    phone: string;
  };
}

interface IAddClientActionSuccess {
  type: typeof ADD_CLIENT_SUCCESS;
}

interface IAddClientActionFail {
  type: typeof CLIENT_ADD_FAIL;
  payload: { message: string };
}
interface IAddClientActionClearFail {
  type: typeof CLEAR_ERROR_CLIENT_ADD_FAIL;
}

// edit Client

interface IEditClientActionRequest {
  type: typeof EDIT_CLIENT_REQUEST;
}

interface IEditClientAction {
  type: typeof EDIT_CLIENT;
  payload: { data: IClient };
}
interface IEditClientActionSuccess {
  type: typeof EDIT_CLIENT_SUCCESS;
}

interface IEditClientsFail {
  type: typeof EDIT_CLIENT_FAIL;
  payload: { message: string };
}

interface IEditClientsFailClear {
  type: typeof CLEAR_ERROR_EDIT_FAIL;
}

// delet Client
interface IDeletClientActionRequest {
  type: typeof DELET_CLIENT_REQUEST;
}

interface IDeletClientAction {
  type: typeof DELET_CLIENT;
  payload: { _id: number };
}

interface IDeletClientActionSuccess {
  type: typeof DELET_CLIENT_SUCCESS;
}
interface IDeletClientActionFail {
  type: typeof CLIENT_DELET_FAIL;
  payload: { message: string };
}
interface IDeletClientActionClearFail {
  type: typeof CLEAR_ERROR_DELET_FAIL;
}
//  client
interface IIsFetchingClientAction {
  type: typeof CLIENTS_REQUEST;
}

interface IRequestClientsSuccess {
  type: typeof CLIENTS_REQUEST_SUCCESS;
  payload: IClient[];
}

interface IRequestClientsFail {
  type: typeof CLIENTS_REQUEST_FAIL;
  payload: { message: string };
}

interface IRequestClientsFailClear {
  type: typeof CLEAR_ERROR_REQUEST_FAIL;
}

///
export type ClientActionTypes =
  | IAddClientActionRequest
  | IAddClientActionAdd
  | IAddClientActionSuccess
  | IEditClientActionRequest
  | IEditClientAction
  | IEditClientActionSuccess
  | IEditClientsFail
  | IEditClientsFailClear
  | IDeletClientAction
  | IIsFetchingClientAction
  | IRequestClientsSuccess
  | IDeletClientActionRequest
  | IDeletClientActionSuccess
  | IDeletClientActionFail
  | IDeletClientActionClearFail
  | IRequestClientsFail
  | IRequestClientsFailClear
  | IAddClientActionFail
  | IAddClientActionClearFail;
