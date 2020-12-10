import { CategoriesActionsType } from "./actionTypes";

export interface IRunFetchCategories {
    type: typeof CategoriesActionsType.FETCH_CATEGORIES;
}
export interface IFetchCategoriesErrorProps {
    response: { data: { message: string } };
}
export interface IRunCategoriesPageFetch {
    type: typeof CategoriesActionsType.FETCH_CATEGORIES_PAGE;
}
export interface IAddCategoryErrorProps {
    response: { data: { message: string } };
}
export interface IRunAddCategory {
    type: typeof CategoriesActionsType.ADD_CATEGORY;
    payload: { data: { name: string; colorId: string }; callback: () => void };
}

export interface IAddCategory {
    type: typeof CategoriesActionsType.ADD_CATEGORY;
    payload: {
        data: {
            name: string;
            colorId: string;
        };
        callback: () => void;
    };
}

export interface IEditCategory {
    type: typeof CategoriesActionsType.ADD_CATEGORY;
    payload: {
        data: {
            name: string;
            colorId: string;
        };
        callback: () => void;
    };
}

export interface IRunEditCategory {
    type: typeof CategoriesActionsType.EDIT_CATEGORY;
    payload: { data: { _id: string; name: string; colorId: string }; callback: () => void };
}
export interface IEditCategoryErrorProps {
    response: { data: { message: string } };
}

export interface IRunDeletCategory {
    type: typeof CategoriesActionsType.DELET_CATEGORY;
    payload: { _id: string; callback: () => void };
}

export interface IDeletCategoryErrorProps {
    response: { data: { message: string } };
}
