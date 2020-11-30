import { IGlobalStore } from "../../reducers/rootReducer";
import { IstateCategories, ICategory } from "./contracts/state";

export const selectCategoriesState = (state: IGlobalStore): IstateCategories => state.categories;

export const selectCategoryesList = (state: IGlobalStore): ICategory[] => selectCategoriesState(state).categoryesList;
