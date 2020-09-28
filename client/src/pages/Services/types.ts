import {
  ADD_SERVIC_SUCCESS,
  ADD_SERVIC_REQUEST,
  CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
  ADD_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_ADD_FAIL,
} from "../../constants";

export interface ICategoryValues {
  name: string;
  comment: string;
  color: string;
}
type serviceList = {
  id: number;
  name: string;
  price: number;
};

export interface IService {
  id: number;
  name: string;
  duration: number[];
  cost: number;
  colorId: string;
  categoriesId: string[];
}
export interface IstateService {
  readonly servicesList: IService[];
  readonly categoryIsAdded: boolean;
  readonly categoryAddIsFail: boolean;
  readonly categoryAdded: boolean;
  readonly categoryAddError: boolean;
  readonly serviceIsAdded: boolean;
  readonly serviceAdded: boolean;
  readonly serviceMessageSuccess: string;
  readonly serviceMessageFail: string;
}

// add service
interface IAddServiceRequest {
  type: typeof ADD_SERVIC_REQUEST;
}

interface IAddServiceSuccess {
  type: typeof ADD_SERVIC_SUCCESS;
  payload: { data: IService; message: string };
}

interface IAddServiceClearMessageSuccess {
  type: typeof CLEAR_MESSAGE_SERVIC_ADD_SUCCESS;
}

interface IAddServiceFail {
  type: typeof ADD_SERVIC_FAIL;
  payload: { message: string };
}
interface IAddServiceFailClear {
  type: typeof CLEAR_MESSAGE_SERVIC_ADD_FAIL;
}
export type ServiceActionTypes =
  | IAddServiceRequest
  | IAddServiceSuccess
  | IAddServiceClearMessageSuccess
  | IAddServiceFail
  | IAddServiceFailClear;

// export interface IClient {
//   _id: number;
//   name: string;
//   female: string;
//   phone: string;
// }
// export interface IClientValues {
//   name: string;
//   female: string;
//   phone: string;
// }
// export interface IstateClients {
//   readonly clientsIsLoading: boolean;
//   readonly clientsLoaded: boolean;
//   readonly clientGetIsFail: boolean;
//   readonly clientGetError: string;
//   readonly clientsList: IClient[];
//   readonly clientIsAdded: boolean;
//   readonly clientAdded: boolean;
//   readonly clientAddIsFail: boolean;
//   readonly clientAddError: string;
//   readonly clientDeleted: boolean;
//   readonly clientIsDeleting: boolean;
//   readonly clientDeletIsFail: boolean;
//   readonly clientDeletError: string;

//   readonly clientEdited: boolean;
//   readonly clientIsEditing: boolean;
//   readonly clientEditIsFail: boolean;
//   readonly clientEditError: string;
// }
// // add new Client
// interface IAddClientActionRequest {
//   type: typeof ADD_CLIENT_REQUEST;
// }

// interface IAddClientActionAdd {
//   type: typeof ADD_CLIENT;
//   payload: {
//     _id: number;
//     name: string;
//     female: string;
//     phone: string;
//   };
// }

// interface IAddClientActionSuccess {
//   type: typeof ADD_CLIENT_SUCCESS;
// }

// interface IAddClientActionFail {
//   type: typeof CLIENT_ADD_FAIL;
//   payload: { message: string };
// }
// interface IAddClientActionClearFail {
//   type: typeof CLEAR_ERROR_CLIENT_ADD_FAIL;
// }

// // edit Client

// interface IEditClientActionRequest {
//   type: typeof EDIT_CLIENT_REQUEST;
// }

// interface IEditClientAction {
//   type: typeof EDIT_CLIENT;
//   payload: { data: IClient };
// }
// interface IEditClientActionSuccess {
//   type: typeof EDIT_CLIENT_SUCCESS;
// }

// interface IEditClientsFail {
//   type: typeof EDIT_CLIENT_FAIL;
//   payload: { message: string };
// }

// interface IEditClientsFailClear {
//   type: typeof CLEAR_ERROR_EDIT_FAIL;
// }

// // delet Client
// interface IDeletClientActionRequest {
//   type: typeof DELET_CLIENT_REQUEST;
// }

// interface IDeletClientAction {
//   type: typeof DELET_CLIENT;
//   payload: { _id: number };
// }

// interface IDeletClientActionSuccess {
//   type: typeof DELET_CLIENT_SUCCESS;
// }
// interface IDeletClientActionFail {
//   type: typeof CLIENT_DELET_FAIL;
//   payload: { message: string };
// }
// interface IDeletClientActionClearFail {
//   type: typeof CLEAR_ERROR_DELET_FAIL;
// }
// //  client
// interface IIsFetchingClientAction {
//   type: typeof CLIENTS_REQUEST;
// }

// interface IRequestClientsSuccess {
//   type: typeof CLIENTS_REQUEST_SUCCESS;
//   payload: IClient[];
// }

// interface IRequestClientsFail {
//   type: typeof CLIENTS_REQUEST_FAIL;
//   payload: { message: string };
// }

// interface IRequestClientsFailClear {
//   type: typeof CLEAR_ERROR_REQUEST_FAIL;
// }

// ///
// export type UserActionTypes =
//   | IAddClientActionRequest
//   | IAddClientActionAdd
//   | IAddClientActionSuccess
//   | IEditClientActionRequest
//   | IEditClientAction
//   | IEditClientActionSuccess
//   | IEditClientsFail
//   | IEditClientsFailClear
//   | IDeletClientAction
//   | IIsFetchingClientAction
//   | IRequestClientsSuccess
//   | IDeletClientActionRequest
//   | IDeletClientActionSuccess
//   | IDeletClientActionFail
//   | IDeletClientActionClearFail
//   | IRequestClientsFail
//   | IRequestClientsFailClear
//   | IAddClientActionFail
//   | IAddClientActionClearFail;
