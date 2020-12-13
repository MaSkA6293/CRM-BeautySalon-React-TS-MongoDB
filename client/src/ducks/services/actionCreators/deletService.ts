import { ServicesActionsType } from "../contracts/actionTypes";
import { IRunDeletService } from "../contracts/types";
import { IDeletServicErrorProps } from "../contracts/types";
import { IDeletServicRequest, IDeletServicSuccess, IDeletServicError } from "../contracts/actionTypes";

export const runDeletService = (_id: string, callback: () => void): IRunDeletService => {
    return {
        type: ServicesActionsType.DELET_SERVICE,
        payload: {
            _id,
            callback,
        },
    };
};

export const deletServiceRequest = (): IDeletServicRequest => {
    return {
        type: ServicesActionsType.DELET_SERVICE_REQUEST,
    };
};

export const deletServiceSuccess = (data: { _id: string; message: string }): IDeletServicSuccess => {
    return {
        type: ServicesActionsType.DELET_SERVICE_SUCCESS,
        payload: { _id: data._id, message: data.message },
    };
};

export const deletServiceError = (e: IDeletServicErrorProps): IDeletServicError => {
    return {
        type: ServicesActionsType.DELET_SERVICE_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
