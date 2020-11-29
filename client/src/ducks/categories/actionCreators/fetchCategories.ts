import { ICategory } from "../contracts/state";
import { CategoriesActionsType } from "../contracts/actionTypes";
import {
    IRunFetchCategories,
    IFetchCategoriesRequest,
    IFetchCategoriesSuccess,
    IFetchCategoriesErrorProps,
    IFetchCategoriesError,
} from "../contracts/actionTypes";

export const runFetchCategories = (): IRunFetchCategories => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES };
};

export const fetchCategoriesRequest = (): IFetchCategoriesRequest => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES_REQUEST };
};

export const fetchCategoriesSuccess = (data: ICategory[]): IFetchCategoriesSuccess => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES_SUCCESS, payload: data };
};

export const fetchCategoriesError = (e: IFetchCategoriesErrorProps): IFetchCategoriesError => {
    return {
        type: CategoriesActionsType.FETCH_CATEGORIES_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
