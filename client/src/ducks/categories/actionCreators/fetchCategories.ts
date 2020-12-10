import { ICategory } from "../contracts/state";
import { CategoriesActionsType } from "../contracts/actionTypes";
import { IFetchCategoriesRequest, IFetchCategoriesSuccess, IFetchCategoriesError } from "../contracts/actionTypes";
import { IRunFetchCategories, IFetchCategoriesErrorProps } from "../contracts/types";

export const runFetchCategories = (): IRunFetchCategories => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES };
};

export const fetchCategoriesRequest = (): IFetchCategoriesRequest => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES_REQUEST };
};

export const fetchCategoriesSuccess = (response: { data: ICategory[] }): IFetchCategoriesSuccess => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES_SUCCESS, payload: response.data };
};

export const fetchCategoriesError = (e: IFetchCategoriesErrorProps): IFetchCategoriesError => {
    return {
        type: CategoriesActionsType.FETCH_CATEGORIES_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
