import { IGlobalStore } from "../../reducers/rootReducer";
import { IstateCategories, ICategory } from "./contracts/state";
import { IColor } from "../colors/contracts/state";

export const selectCategoriesState = (state: IGlobalStore): IstateCategories => state.categories;
export type itemCategoriesListPlusColor = {
    _id: string;
    name: string;
    color: IColor;
};
export const selectCategoriesList = (state: IGlobalStore): ICategory[] => selectCategoriesState(state).categoryesList;
export const selectCategoryIsAdding = (state: IGlobalStore): boolean => selectCategoriesState(state).categoryIsAdding;
export const selectCategoryIsEditing = (state: IGlobalStore): boolean => selectCategoriesState(state).categoryIsEditing;
export const selectCategoryIsDeleting = (state: IGlobalStore): boolean =>
    selectCategoriesState(state).categoryIsDeleting;
export const selectCategoriesListAndColor = (state: IGlobalStore): itemCategoriesListPlusColor[] =>
    selectCategoriesState(state).categoryesList.map(
        (item: ICategory): itemCategoriesListPlusColor => {
            const color = state.colors.colorsList.find((el) => el._id.toString() === item.colorId);
            return {
                _id: item._id,
                name: item.name,
                color: color ? color : { _id: "1", hex: "22" },
            };
        },
    );
export const selectCategoriesIsFetching = (state: IGlobalStore): boolean =>
    selectCategoriesState(state).categoryesIsFetching;

export const selectCategoryesMessageError = (state: IGlobalStore): string =>
    selectCategoriesState(state).categoryesMessageError;

export const selectCategoryesMessageSuccess = (state: IGlobalStore): string =>
    selectCategoriesState(state).categoryesMessageSuccess;
