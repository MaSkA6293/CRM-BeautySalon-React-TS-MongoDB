import {
    CategoriesActionsType,
    IAddCategoryRequest,
    IAddCategorySuccess,
    IAddCategoryError,
} from "../contracts/actionTypes";
import { IAddCategoryErrorProps, IRunAddCategory } from "../contracts/types";
import { ICategory } from "../contracts/state";
export const runAddCategory = (
    data: {
        name: string;
        colorId: string;
    },
    callback: () => void,
): IRunAddCategory => {
    return {
        type: CategoriesActionsType.ADD_CATEGORY,
        payload: {
            data,
            callback,
        },
    };
};

export const addCategoryRequest = (): IAddCategoryRequest => {
    return {
        type: CategoriesActionsType.ADD_CATEGORY_REQUEST,
    };
};

export const addCategorySuccess = (data: { data: ICategory; message: string }): IAddCategorySuccess => {
    return {
        type: CategoriesActionsType.ADD_CATEGORY_SUCCESS,
        payload: {
            data: {
                _id: data.data._id,
                name: data.data.name,
                colorId: data.data.colorId,
            },
            message: data.message,
        },
    };
};

export const addCategoryError = (e: IAddCategoryErrorProps): IAddCategoryError => {
    return {
        type: CategoriesActionsType.ADD_CATEGORY_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
