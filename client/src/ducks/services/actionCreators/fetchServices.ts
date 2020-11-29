import { IService } from "../contracts/state";
import { ServicesActionsType } from "../contracts/actionTypes";
import {
    IRunFetchservices,
    IFetchServicesRequest,
    IFetchServicesSuccess,
    IFetchServicesErrorProps,
    IFetchServicesError,
} from "../contracts/actionTypes";

export const runFetchServices = (): IRunFetchservices => {
    return { type: ServicesActionsType.FETCH_SERVICES };
};

export const fetchServicesRequest = (): IFetchServicesRequest => {
    return { type: ServicesActionsType.FETCH_SERVICES_REQUEST };
};

export const fetchServicesSuccess = (data: IService[]): IFetchServicesSuccess => {
    return { type: ServicesActionsType.FETCH_SERVICES_SUCCESS, payload: data };
};

export const fetchServicesError = (e: IFetchServicesErrorProps): IFetchServicesError => {
    return {
        type: ServicesActionsType.FETCH_SERVICES_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
