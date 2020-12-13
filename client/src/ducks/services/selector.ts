import { IGlobalStore } from "../../reducers/rootReducer";
import { IService, IstateService } from "./contracts/state";
import store from "../../store";

export const selectServicesState = (state: IGlobalStore): IstateService => state.services;
export const selectServicesMessageError = (state: IGlobalStore): string =>
    selectServicesState(state).servicesMessageError;
export const selectServicesIsFetching = (state: IGlobalStore): boolean => selectServicesState(state).servicesIsFetching;
export const selectServicesMessageSuccess = (state: IGlobalStore): string =>
    selectServicesState(state).servicesMessageSuccess;
export const selectServicesServiceIsAdding = (state: IGlobalStore): boolean =>
    selectServicesState(state).serviceIsAdding;
export const selectServicesServiceIsEditing = (state: IGlobalStore): boolean =>
    selectServicesState(state).serviceIsEditing;
export const selectServicesServiceIsDeleting = (state: IGlobalStore): boolean =>
    selectServicesState(state).serviceIsDeleting;
export interface ISelectServicesToShow {
    _id: string;
    name: string;
    duration: number[];
    cost: number;
    color: {
        hex: string | undefined;
        _id: string;
    };
    categoryColor: (string | undefined)[];
    categoriesId: string[];
}

export const selectServicesList = (state: IGlobalStore): ISelectServicesToShow[] => {
    const colors = store.getState().colors.colorsList;
    const categories = store.getState().categories.categoryesList;
    return selectServicesState(state).servicesList.map((item: IService) => {
        return {
            _id: item._id,
            name: item.name,
            duration: item.duration,
            cost: item.cost,
            color: {
                hex: colors.find((el) => el._id === item.colorId)?.hex,
                _id: item.colorId,
            },
            categoryColor: item.categoriesId.map((id) => {
                const colorId = categories.find((el) => el._id === id)?.colorId;
                return colors.find((el) => el._id === colorId)?.hex;
            }),
            categoriesId: item.categoriesId,
        };
    });
};
