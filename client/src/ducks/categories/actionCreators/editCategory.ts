import {
    CategoriesActionsType,
    IEditCategoryRequest,
    IEditCategorySuccess,
    IEditCategoryError,
} from "../contracts/actionTypes";
import { IRunEditCategory, IEditCategoryErrorProps } from "../contracts/types";
import { ICategory } from "../contracts/state";

export const runEditCategory = (
    data: {
        _id: string;
        name: string;
        colorId: string;
    },
    callback: () => void,
): IRunEditCategory => {
    return {
        type: CategoriesActionsType.EDIT_CATEGORY,
        payload: { data, callback },
    };
};

export const editCategoryRequest = (): IEditCategoryRequest => {
    return {
        type: CategoriesActionsType.EDIT_CATEGORY_REQUEST,
    };
};

export const editCategorySuccess = (data: { data: ICategory; message: string }): IEditCategorySuccess => {
    return {
        type: CategoriesActionsType.EDIT_CATEGORY_SUCCESS,
        payload: { data: data.data, message: data.message },
    };
};

export const editCategoryError = (e: IEditCategoryErrorProps): IEditCategoryError => {
    return {
        type: CategoriesActionsType.EDIT_CATEGORY_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
