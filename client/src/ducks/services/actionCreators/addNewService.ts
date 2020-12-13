import { ServicesActionsType } from "../contracts/actionTypes";
import { IAddServic, IRunAddNewService } from "../contracts/types";
import { IService } from "../contracts/state";
import { IAddServicErrorProps } from "../contracts/types";
import { IAddServicRequest, IAddServicSuccess, IAddServicError } from "../contracts/actionTypes";

export const runAddNewService = (data: IAddServic, callback: () => void): IRunAddNewService => {
    return {
        type: ServicesActionsType.ADD_NEW_SERVICE,
        payload: {
            data,
            callback,
        },
    };
};

export const addServiceRequest = (): IAddServicRequest => {
    return {
        type: ServicesActionsType.ADD_NEW_SERVICE_REQUEST,
    };
};

export const addServiceSuccess = (data: { data: IService; message: string }): IAddServicSuccess => {
    return {
        type: ServicesActionsType.ADD_NEW_SERVICE_SUCCESS,
        payload: { data: data.data, message: data.message },
    };
};

export const addServiceError = (e: IAddServicErrorProps): IAddServicError => {
    return {
        type: ServicesActionsType.ADD_NEW_SERVICE_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
