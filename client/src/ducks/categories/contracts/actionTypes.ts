import { ICategory } from "./state";

export enum CategoriesActionsType {
    CATEGORIES_CLEAR_MESSAGE = "categories/CATEGORIES_CLEAR_MESSAGE",
    FETCH_CATEGORIES = "categories/FETCH_CATEGORIES",
    FETCH_CATEGORIES_REQUEST = "categories/FETCH_CATEGORIES_REQUEST",
    FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_ERROR = "categories/FETCH_CATEGORIES_ERROR",
}

export interface IRunFetchCategories {
    type: typeof CategoriesActionsType.FETCH_CATEGORIES;
}
export interface IFetchCategoriesErrorProps {
    response: { data: { message: string } };
}

//actions
export interface IClearMessageCategories {
    type: typeof CategoriesActionsType.CATEGORIES_CLEAR_MESSAGE;
}
export interface IFetchCategoriesRequest {
    type: typeof CategoriesActionsType.FETCH_CATEGORIES_REQUEST;
}
export interface IFetchCategoriesSuccess {
    type: CategoriesActionsType.FETCH_CATEGORIES_SUCCESS;
    payload: ICategory[];
}
export interface IFetchCategoriesError {
    type: CategoriesActionsType.FETCH_CATEGORIES_ERROR;
    payload: {
        message: string;
    };
}

export type CategoriesAction =
    | IFetchCategoriesRequest
    | IFetchCategoriesSuccess
    | IFetchCategoriesError
    | IClearMessageCategories;
