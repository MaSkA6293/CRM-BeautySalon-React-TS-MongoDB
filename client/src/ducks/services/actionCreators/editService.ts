import { ServicesActionsType } from "../contracts/actionTypes";
import { IRunEditService } from "../contracts/types";
import { IService } from "../contracts/state";
import { IEditServicErrorProps } from "../contracts/types";
import { IEditServicRequest, IEditServicSuccess, IEditServicError } from "../contracts/actionTypes";

export const runEditService = (data: IService, callback: () => void): IRunEditService => {
    return {
        type: ServicesActionsType.EDIT_SERVICE,
        payload: {
            data,
            callback,
        },
    };
};

export const editServiceRequest = (): IEditServicRequest => {
    return {
        type: ServicesActionsType.EDIT_SERVICE_REQUEST,
    };
};

export const editServiceSuccess = (data: { data: IService; message: string }): IEditServicSuccess => {
    return {
        type: ServicesActionsType.EDIT_SERVICE_SUCCESS,
        payload: { data: data.data, message: data.message },
    };
};

export const editServiceError = (e: IEditServicErrorProps): IEditServicError => {
    return {
        type: ServicesActionsType.EDIT_SERVICE_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
