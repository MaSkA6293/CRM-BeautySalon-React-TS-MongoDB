import {
    CategoriesActionsType,
    IDeletCategoryRequest,
    IDeletCategorySuccess,
    IDeletCategoryError,
} from "../contracts/actionTypes";
import { IRunDeletCategory, IDeletCategoryErrorProps } from "../contracts/types";
export const runDeletCategory = (_id: string, callback: () => void): IRunDeletCategory => {
    return {
        type: CategoriesActionsType.DELET_CATEGORY,
        payload: { _id: _id, callback: callback },
    };
};

export const deletCategoryRequest = (): IDeletCategoryRequest => {
    return {
        type: CategoriesActionsType.DELET_CATEGORY_REQUEST,
    };
};

export const deletCategorySuccess = (data: { _id: string; message: string }): IDeletCategorySuccess => {
    return {
        type: CategoriesActionsType.DELET_CATEGORY_SUCCESS,
        payload: { _id: data._id, message: data.message },
    };
};

export const deletCategoryError = (e: IDeletCategoryErrorProps): IDeletCategoryError => {
    return {
        type: CategoriesActionsType.DELET_CATEGORY_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
