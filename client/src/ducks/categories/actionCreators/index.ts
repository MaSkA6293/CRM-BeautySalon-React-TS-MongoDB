import { CategoriesActionsType } from "../contracts/actionTypes";
import { IClearMessageCategories } from "../contracts/actionTypes";

export const clearMessageCategories = (): IClearMessageCategories => {
    return {
        type: CategoriesActionsType.CATEGORIES_CLEAR_MESSAGE,
    };
};
