import { IstateService } from "./contracts/state";
import { ServicesAction } from "./contracts/actionTypes";
import { ServicesActionsType } from "./contracts/actionTypes";

export const initialState: IstateService = {
    servicesIsFetching: false,
    servicesList: [],
    servicesMessageError: "",
    servicesMessageSuccess: "",

    servicesIsLoading: true,
    servicesLoaded: false,
    servicesGetIsFail: false,
    servicesGetError: "",

    servicePageRequest: false,

    serviceIsAdding: false,

    serviceIsEditing: false,

    serviceIsDeleting: false,
};
type stateServicesProps = Readonly<typeof initialState>;

const stateServices = (state: IstateService = initialState, action: ServicesAction): stateServicesProps => {
    switch (action.type) {
        case ServicesActionsType.FETCH_SERVICES_REQUEST:
            return { ...state, servicesIsFetching: true };

        case ServicesActionsType.FETCH_SERVICES_SUCCESS:
            return { ...state, servicesList: action.payload, servicesIsFetching: false };

        case ServicesActionsType.FETCH_SERVICES_ERROR:
            return { ...state, servicesMessageError: action.payload.message };

        case ServicesActionsType.ADD_NEW_SERVICE_REQUEST:
            return { ...state, serviceIsAdding: true };

        case ServicesActionsType.ADD_NEW_SERVICE_SUCCESS:
            return {
                ...state,
                servicesList: [...state.servicesList, action.payload.data],
                serviceIsAdding: false,
                servicesMessageSuccess: action.payload.message,
            };

        case ServicesActionsType.ADD_NEW_SERVICE_ERROR:
            return { ...state, serviceIsAdding: false, servicesMessageError: action.payload.message };

        case ServicesActionsType.EDIT_SERVICE_REQUEST:
            return { ...state, serviceIsEditing: true };

        case ServicesActionsType.EDIT_SERVICE_SUCCESS:
            return {
                ...state,
                servicesList: state.servicesList.map((el) => {
                    if (el._id === action.payload.data._id) {
                        return action.payload.data;
                    } else {
                        return el;
                    }
                }),
                serviceIsEditing: false,
                servicesMessageSuccess: action.payload.message,
            };

        case ServicesActionsType.EDIT_SERVICE_ERROR:
            return { ...state, serviceIsEditing: false, servicesMessageError: action.payload.message };

        case ServicesActionsType.DELET_SERVICE_REQUEST:
            return { ...state, serviceIsDeleting: true };

        case ServicesActionsType.DELET_SERVICE_SUCCESS:
            return {
                ...state,
                servicesList: state.servicesList.filter((el) => el._id !== action.payload._id),
                serviceIsDeleting: false,
                servicesMessageSuccess: action.payload.message,
            };

        case ServicesActionsType.DELET_SERVICE_ERROR:
            return { ...state, serviceIsDeleting: false, servicesMessageError: action.payload.message };

        case ServicesActionsType.SERVICES_CLEAR_MESSAGE:
            return { ...state, servicesMessageError: "", servicesMessageSuccess: "" };

        default:
            return state;
    }
};

export default stateServices;
