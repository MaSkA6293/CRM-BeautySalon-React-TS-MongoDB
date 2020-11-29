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

    serviceIsAdded: false,
    serviceAdded: false,

    serviceIsEdited: false,
    serviceEdited: false,

    serviceIsDeleted: false,
    serviceDeleted: false,
};

const stateServices = (state: IstateService = initialState, action: ServicesAction) => {
    switch (action.type) {
        case ServicesActionsType.FETCH_SERVICES_REQUEST:
            return { ...state, servicesIsFetching: true };

        case ServicesActionsType.FETCH_SERVICES_SUCCESS:
            return { ...state, servicesList: action.payload };

        case ServicesActionsType.FETCH_SERVICES_ERROR:
            return { ...state, servicesMessageError: action.payload.message };

        case ServicesActionsType.SERVICES_CLEAR_MESSAGE:
            return { ...state, servicesMessageError: "", servicesMessageSuccess: "" };
        default:
            return state;
    }
};

export default stateServices;
