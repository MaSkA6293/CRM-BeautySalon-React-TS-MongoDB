import { ICategory } from "./state";

export enum CategoriesActionsType {
    CATEGORIES_CLEAR_MESSAGE = "categories/CATEGORIES_CLEAR_MESSAGE",
    FETCH_CATEGORIES = "categories/FETCH_CATEGORIES",
    FETCH_CATEGORIES_REQUEST = "categories/FETCH_CATEGORIES_REQUEST",
    FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_ERROR = "categories/FETCH_CATEGORIES_ERROR",
    FETCH_CATEGORIES_PAGE = "categories/FETCH_CATEGORIES_PAGE",
    ADD_CATEGORY = "categories/ADD_CATEGORY",
    ADD_CATEGORY_REQUEST = "categories/ADD_CATEGORY_REQUEST",
    ADD_CATEGORY_SUCCESS = "categories/ADD_CATEGORY_SUCCESS",
    ADD_CATEGORY_ERROR = "categories/ADD_CATEGORY_ERROR",
    EDIT_CATEGORY = "categories/EDIT_CATEGORY",
    EDIT_CATEGORY_REQUEST = "categories/EDIT_CATEGORY_REQUEST",
    EDIT_CATEGORY_SUCCESS = "categories/EDIT_CATEGORY_SUCCESS",
    EDIT_CATEGORY_ERROR = "categories/EDIT_CATEGORY_ERROR",
    DELET_CATEGORY = "categories/DELET_CATEGORY",
    DELET_CATEGORY_REQUEST = "categories/DELET_CATEGORY_REQUEST",
    DELET_CATEGORY_SUCCESS = "categories/DELET_CATEGORY_SUCCESS",
    DELET_CATEGORY_ERROR = "categories/DELET_CATEGORY_ERROR",
}
//FETCH
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
// ADD

export interface IAddCategoryRequest {
    type: typeof CategoriesActionsType.ADD_CATEGORY_REQUEST;
}

export interface IAddCategorySuccess {
    type: typeof CategoriesActionsType.ADD_CATEGORY_SUCCESS;
    payload: {
        data: ICategory;
        message: string;
    };
}

export interface IAddCategoryError {
    type: CategoriesActionsType.ADD_CATEGORY_ERROR;
    payload: {
        message: string;
    };
}

// EDIT
export interface IEditCategoryRequest {
    type: typeof CategoriesActionsType.EDIT_CATEGORY_REQUEST;
}
export interface IEditCategorySuccess {
    type: typeof CategoriesActionsType.EDIT_CATEGORY_SUCCESS;
    payload: { data: ICategory; message: string };
}
export interface IEditCategoryError {
    type: CategoriesActionsType.EDIT_CATEGORY_ERROR;
    payload: {
        message: string;
    };
}

// delet

export interface IDeletCategoryRequest {
    type: typeof CategoriesActionsType.DELET_CATEGORY_REQUEST;
}
export interface IDeletCategorySuccess {
    type: typeof CategoriesActionsType.DELET_CATEGORY_SUCCESS;
    payload: { _id: string; message: string };
}

export interface IDeletCategoryError {
    type: CategoriesActionsType.DELET_CATEGORY_ERROR;
    payload: {
        message: string;
    };
}

export type CategoriesAction =
    | IFetchCategoriesRequest
    | IFetchCategoriesSuccess
    | IFetchCategoriesError
    | IClearMessageCategories
    | IAddCategoryRequest
    | IAddCategorySuccess
    | IAddCategoryError
    | IEditCategoryRequest
    | IEditCategorySuccess
    | IEditCategoryError
    | IDeletCategoryRequest
    | IDeletCategorySuccess
    | IDeletCategoryError;
