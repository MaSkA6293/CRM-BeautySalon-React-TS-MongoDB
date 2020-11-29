import { IStateCategories } from "./contracts/state";
import { CategoriesActionsType } from "./contracts/actionTypes";

export const initialState: IStateCategories = {
    categoryesIsFetching: false,
    categoryesList: [],
    categoryesMessageError: "",
    categoryesMessageSuccess: "",
};

const stateCategories = (state: IstateCategories = initialState, action: CategoriesAction) => {
    switch (action.type) {
        case CategoriesActionsType.FETCH_CATEGORIES_REQUEST:
            return { ...state, servicesIsFetching: true };

        case CategoriesActionsType.FETCH_CATEGORIES_SUCCESS:
            return { ...state, servicesList: action.payload };

        case CategoriesActionsType.FETCH_CATEGORIES_ERROR:
            return { ...state, servicesMessageError: action.payload.message };

        case CategoriesActionsType.CATEGORIES_CLEAR_MESSAGE:
            return { ...state, servicesMessageError: "", servicesMessageSuccess: "" };
        default:
            return state;
    }
};

export default stateCategories;
