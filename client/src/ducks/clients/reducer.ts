import { ClientsActionsType, ClientsAction } from "./contracts/actionTypes";
import { IstateClients } from "./contracts/state";

const initialState: IstateClients = {
    clientsLoaded: false,
    clientsIsLoading: false,

    clientDeleted: false,
    clientIsDeleting: false,

    clientEdited: false,
    clientIsEditing: false,

    clientsList: [],

    clientIsAdding: false,
    clientAdded: false,

    clientMessageSuccess: "",
    clientMessageError: "",
};
const stateClients = (state: IstateClients = initialState, action: ClientsAction): IstateClients => {
    switch (action.type) {
        case ClientsActionsType.ADD_CLIENT_REQUEST:
            return { ...state, clientIsAdding: true, clientAdded: false };
        case ClientsActionsType.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                clientIsAdding: false,
                clientAdded: true,
                clientsList: [...state.clientsList, action.payload.client],
                clientMessageSuccess: action.payload.message,
            };
        case ClientsActionsType.CLEAR_MESSAGE_CLIENT:
            return {
                ...state,
                clientMessageSuccess: "",
                clientMessageError: "",
            };
        case ClientsActionsType.CLIENT_ADD_FAIL:
            return {
                ...state,
                clientIsAdding: false,
                clientMessageError: action.payload.message,
            };

        case ClientsActionsType.EDIT_CLIENT_REQUEST:
            return {
                ...state,
                clientEdited: false,
                clientIsEditing: true,
            };
        case ClientsActionsType.EDIT_CLIENT_SUCCESS:
            return {
                ...state,
                clientEdited: true,
                clientIsEditing: false,
                clientsList: state.clientsList.map((client) =>
                    client._id === action.payload.data._id ? action.payload.data : client,
                ),
                clientMessageSuccess: action.payload.message,
            };
        case ClientsActionsType.EDIT_CLIENT_FAIL:
            return {
                ...state,
                clientIsEditing: false,
                clientMessageError: action.payload.message,
            };
        case ClientsActionsType.DELET_CLIENT_REQUEST:
            return {
                ...state,
                clientIsDeleting: true,
                clientDeleted: false,
            };
        case ClientsActionsType.DELET_CLIENT_SUCCESS:
            return {
                ...state,
                clientsList: state.clientsList.filter((item) => item._id !== action.payload._id),
                clientIsDeleting: false,
                clientDeleted: true,
                clientMessageSuccess: action.payload.message,
            };
        case ClientsActionsType.CLIENT_DELET_FAIL:
            return {
                ...state,
                clientIsDeleting: false,
                clientMessageError: action.payload.message,
            };
        case ClientsActionsType.CLIENTS_REQUEST:
            return {
                ...state,
                clientsIsLoading: true,
                clientsLoaded: false,
                clientsList: [],
            };
        case ClientsActionsType.CLIENTS_REQUEST_SUCCESS:
            return {
                ...state,
                clientsIsLoading: false,
                clientsLoaded: true,
                clientsList: action.payload,
            };
        case ClientsActionsType.CLIENTS_REQUEST_FAIL:
            return {
                ...state,
                clientsIsLoading: false,
                clientMessageError: action.payload.message,
            };
        default:
            return state;
    }
};

export default stateClients;
