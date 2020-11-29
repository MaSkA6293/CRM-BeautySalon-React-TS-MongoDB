import { IService } from "../contracts/state";
export enum ServicesActionsType {
    SERVICES_CLEAR_MESSAGE = "services/SERVICES_CLEAR_MESSAGE",
    FETCH_SERVICES = "services/FETCH_SERVICES",
    FETCH_SERVICES_REQUEST = "services/FETCH_SERVICES_REQUEST",
    FETCH_SERVICES_SUCCESS = "services/FETCH_SERVICES_SUCCESS",
    FETCH_SERVICES_ERROR = "services/FETCH_SERVICES_ERROR",
}

export interface IRunFetchservices {
    type: typeof ServicesActionsType.FETCH_SERVICES;
}
export interface IFetchServicesErrorProps {
    response: { data: { message: string } };
}

//actions
export interface IClearMessageServices {
    type: typeof ServicesActionsType.SERVICES_CLEAR_MESSAGE;
}
export interface IFetchServicesRequest {
    type: typeof ServicesActionsType.FETCH_SERVICES_REQUEST;
}
export interface IFetchServicesSuccess {
    type: ServicesActionsType.FETCH_SERVICES_SUCCESS;
    payload: IService[];
}
export interface IFetchServicesError {
    type: ServicesActionsType.FETCH_SERVICES_ERROR;
    payload: {
        message: string;
    };
}

export type ServicesAction =
    | IFetchServicesRequest
    | IFetchServicesSuccess
    | IFetchServicesError
    | IClearMessageServices;
