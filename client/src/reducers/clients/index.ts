import {
  EDIT_CLIENT_REQUEST,
  EDIT_CLIENT,
  CLIENTS_REQUEST,
  CLIENTS_REQUEST_SUCCESS,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL,
  CLEAR_ERROR_EDIT_FAIL,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  CLIENT_ADD_FAIL,
  CLEAR_ERROR_CLIENT_ADD_FAIL,
  DELET_CLIENT,
  DELET_CLIENT_REQUEST,
  DELET_CLIENT_SUCCESS,
  CLIENT_DELET_FAIL,
  CLEAR_ERROR_DELET_FAIL,
  CLIENTS_REQUEST_FAIL,
  CLEAR_ERROR_REQUEST_FAIL,
} from "../../constants";
import { ClientActionTypes, IstateClients } from "../../types/typesClients";

const initialState: IstateClients = {
  clientsLoaded: false,
  clientsIsLoading: false,
  clientGetIsFail: false,
  clientGetError: "",

  clientDeleted: false,
  clientIsDeleting: false,
  clientDeletIsFail: false,
  clientDeletError: "",

  clientEdited: false,
  clientIsEditing: false,
  clientEditIsFail: false,
  clientEditError: "",

  clientsList: [],

  clientIsAdded: false,
  clientAdded: false,
  clientAddIsFail: false,
  clientAddError: "",
};
const stateClients = (
  state: IstateClients = initialState,
  action: ClientActionTypes
) => {
  switch (action.type) {
    case ADD_CLIENT_REQUEST:
      return { ...state, clientIsAdded: true, clientAdded: false };
    case ADD_CLIENT:
      return {
        ...state,
        clientIsAdded: false,
        clientAdded: true,
        clientsList: [...state.clientsList, action.payload],
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clientAdded: false,
      };
    case CLIENT_ADD_FAIL:
      return {
        ...state,
        clientIsAdded: false,
        clientAddIsFail: true,
        clientAddError: action.payload.message,
      };
    case CLEAR_ERROR_CLIENT_ADD_FAIL: {
      return { ...state, clientAddIsFail: false, clientAddError: "" };
    }

    case EDIT_CLIENT_REQUEST:
      return {
        ...state,
        clientEdited: false,
        clientIsEditing: true,
      };
    case EDIT_CLIENT:
      return {
        ...state,
        clientEdited: true,
        clientIsEditing: false,
        clientsList: state.clientsList.map((client) =>
          client._id === action.payload.data._id ? action.payload.data : client
        ),
      };
    case EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        clientEdited: false,
      };
    case EDIT_CLIENT_FAIL:
      return {
        ...state,
        clientIsEditing: false,
        clientEditIsFail: true,
        clientEditError: action.payload.message,
      };
    case CLEAR_ERROR_EDIT_FAIL:
      return {
        ...state,
        clientEditIsFail: false,
        clientEditError: "",
      };
    case DELET_CLIENT_REQUEST:
      return {
        ...state,
        clientIsDeleting: true,
        clientDeleted: false,
      };
    case DELET_CLIENT:
      return {
        ...state,
        clientsList: state.clientsList.filter(
          (item) => item._id !== action.payload._id
        ),
        clientIsDeleting: false,
        clientDeleted: true,
      };
    case DELET_CLIENT_SUCCESS:
      return {
        ...state,
        clientDeleted: false,
      };
    case CLIENT_DELET_FAIL:
      return {
        ...state,
        clientIsDeleting: false,
        clientDeletIsFail: true,
        clientDeletError: action.payload.message,
      };
    case CLEAR_ERROR_DELET_FAIL:
      return { ...state, clientDeletError: "", clientDeletIsFail: false };

    case CLIENTS_REQUEST:
      return {
        ...state,
        clientsIsLoading: true,
        clientsLoaded: false,
        clientsList: [],
      };
    case CLIENTS_REQUEST_SUCCESS:
      return {
        ...state,
        clientsIsLoading: false,
        clientsLoaded: true,
        clientsList: action.payload,
      };
    case CLIENTS_REQUEST_FAIL:
      return {
        ...state,
        clientsIsLoading: false,
        clientGetIsFail: true,
        clientGetError: action.payload.message,
      };

    case CLEAR_ERROR_REQUEST_FAIL:
      return {
        ...state,
        clientGetIsFail: false,
        clientGetError: "",
      };
    default:
      return state;
  }
};

export default stateClients;
