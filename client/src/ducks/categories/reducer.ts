import { IstateCategories } from "./contracts/state";
import { CategoriesActionsType, CategoriesAction } from "./contracts/actionTypes";

export const initialState: IstateCategories = {
    categoryIsAdding: false,
    categoryIsEditing: false,
    categoryIsDeleting: false,
    categoryesIsFetching: false,
    categoryesList: [],
    categoryesMessageError: "",
    categoryesMessageSuccess: "",
};

const stateCategories = (state: IstateCategories = initialState, action: CategoriesAction) => {
    switch (action.type) {
        case CategoriesActionsType.FETCH_CATEGORIES_REQUEST:
            return { ...state, categoryesIsFetching: true };

        case CategoriesActionsType.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categoryesIsFetching: false, categoryesList: action.payload };
        case CategoriesActionsType.FETCH_CATEGORIES_ERROR:
            return { ...state, categoryesIsFetching: false, categoryesMessageError: action.payload.message };
        case CategoriesActionsType.ADD_CATEGORY_REQUEST:
            return { ...state, categoryIsAdding: true };
        case CategoriesActionsType.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryIsAdding: false,
                categoryesList: [...state.categoryesList, action.payload.data],
                categoryesMessageSuccess: action.payload.message,
            };
        case CategoriesActionsType.ADD_CATEGORY_ERROR:
            return { ...state, categoryIsAdding: false, categoryesMessageError: action.payload.message };

        case CategoriesActionsType.EDIT_CATEGORY_REQUEST:
            return { ...state, categoryIsEditing: true };
        case CategoriesActionsType.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryIsEditing: false,
                categoryesList: state.categoryesList.map((el) => {
                    if (el._id === action.payload.data._id) {
                        return action.payload.data;
                    } else {
                        return el;
                    }
                }),
                categoryesMessageSuccess: action.payload.message,
            };
        case CategoriesActionsType.EDIT_CATEGORY_ERROR:
            return { ...state, categoryIsEditing: false, categoryesMessageError: action.payload.message };

        case CategoriesActionsType.CATEGORIES_CLEAR_MESSAGE:
            return { ...state, categoryesMessageError: "", categoryesMessageSuccess: "" };

        case CategoriesActionsType.DELET_CATEGORY_REQUEST:
            return { ...state, categoryIsDeleting: true };
        case CategoriesActionsType.DELET_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryIsDeleting: false,
                categoryesList: state.categoryesList.filter((el) => el._id !== action.payload._id),
                categoryesMessageSuccess: action.payload.message,
            };
        case CategoriesActionsType.DELET_CATEGORY_ERROR:
            return { ...state, categoryIsDeleting: false, categoryesMessageError: action.payload.message };
        default:
            return state;
    }
};

export default stateCategories;
