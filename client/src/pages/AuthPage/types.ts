import {
  USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAIL,
  CLEAR_USER_REQUEST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  CLEAR_LOGIN_FAIL,
  USER_LOGOOUT,
  USER_READY,
} from "../../constants";

export interface IstateUser {
  userLoaded: boolean;
  userIsLoading: boolean;
  userGetIsFail: boolean;
  userGetError: string;

  userIsLogining: boolean;
  userIsLogined: boolean;
  userLoginIsFail: boolean;
  userLoginError: string;
  userData: { token: string; id: string };
  userReady: boolean;
}

//  USER
interface IUserRequestAction {
  type: typeof USER_REQUEST;
}

interface IUserRequestSuccess {
  type: typeof USER_REQUEST_SUCCESS;
}

interface IRequestUserFail {
  type: typeof USER_REQUEST_FAIL;
  payload: { message: string };
}
interface IRequestUserFailClear {
  type: typeof CLEAR_USER_REQUEST_FAIL;
}

interface IUserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: { token: string; id: string };
}

interface ILoginUserFail {
  type: typeof USER_LOGIN_FAIL;
  payload: { message: string };
}
interface ILoginUserFailClear {
  type: typeof CLEAR_LOGIN_FAIL;
}

interface ILogoOut {
  type: typeof USER_LOGOOUT;
}
interface IUserReady {
  type: typeof USER_READY;
  payload: boolean;
}

export type UserActionTypes =
  | IUserRequestAction
  | IUserRequestSuccess
  | IRequestUserFail
  | IRequestUserFailClear
  | IUserLoginRequest
  | IUserLoginSuccess
  | ILoginUserFail
  | ILoginUserFailClear
  | ILogoOut
  | IUserReady;

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
