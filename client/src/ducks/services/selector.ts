import { IGlobalStore } from "../../reducers/rootReducer";
import { IService, IstateService } from "./contracts/state";
import store from "../../store";
const colors = store.getState().colors.colorsList;
const categories = store.getState().categories.categoryesList;
export const selectServicesState = (state: IGlobalStore): IstateService => state.services;
export const selectServicesMessageError = (state: IGlobalStore): string =>
    selectServicesState(state).servicesMessageError;
export const selectServicesIsFetching = (state: IGlobalStore): boolean => selectServicesState(state).servicesIsFetching;
export const selectServicesList = (state: IGlobalStore): any => {
    return selectServicesState(state).servicesList.map((item: IService) => {
        return {
            _id: item._id,
            name: item.name,
            duration: item.duration,
            cost: item.cost,
            color: {
                hex: colors.find((el) => el._id.toString() === item.colorId)?.hex,
                _id: item.colorId,
            },
            categoryColor: item.categoriesId.map((id) => {
                const colorId = categories.find((el) => el._id === id)?.colorId;
                return colors.find((el) => el._id.toString() === colorId)?.hex;
            }),
            categoriesId: item.categoriesId,
        };
    });
};
