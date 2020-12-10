import { CategoriesActionsType } from "../contracts/actionTypes";
import { IRunCategoriesPageFetch } from "../contracts/types";
export const runCategoriesPageFetch = (): IRunCategoriesPageFetch => {
    return { type: CategoriesActionsType.FETCH_CATEGORIES_PAGE };
};
