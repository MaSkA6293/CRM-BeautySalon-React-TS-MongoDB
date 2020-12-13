import { IService } from "../contracts/state";
export enum ServicesActionsType {
    SERVICES_CLEAR_MESSAGE = "services/SERVICES_CLEAR_MESSAGE",
    FETCH_SERVICES = "services/FETCH_SERVICES",
    FETCH_SERVICES_REQUEST = "services/FETCH_SERVICES_REQUEST",
    FETCH_SERVICES_SUCCESS = "services/FETCH_SERVICES_SUCCESS",
    FETCH_SERVICES_ERROR = "services/FETCH_SERVICES_ERROR",
    FETCH_SERVICES_PAGE = "services/FETCH_SERVICES_PAGE",
    ADD_NEW_SERVICE = "services/ADD_NEW_SERVICE",
    ADD_NEW_SERVICE_REQUEST = "services/ADD_NEW_SERVICE_REQUEST",
    ADD_NEW_SERVICE_SUCCESS = "services/ADD_NEW_SERVICE_SUCCESS",
    ADD_NEW_SERVICE_ERROR = "srevices/ADD_NEW_SERVICE_ERROR",
    EDIT_SERVICE = "services/EDIT_SERVICE",
    EDIT_SERVICE_REQUEST = "services/EDIT_SERVICE_REQUEST",
    EDIT_SERVICE_SUCCESS = "services/EDIT_SERVICE_SUCCESS",
    EDIT_SERVICE_ERROR = "services/EDIT_SERVICE_ERROR",
    DELET_SERVICE = "services/DELET_SERVICE",
    DELET_SERVICE_REQUEST = "services/DELET_SERVICE_REQUEST",
    DELET_SERVICE_SUCCESS = "services/DELET_SERVICE_SUCCESS",
    DELET_SERVICE_ERROR = "services/DELET_SERVICE_ERROR",
}

export interface IRunFetchservices {
    type: typeof ServicesActionsType.FETCH_SERVICES;
}
export interface IRunFetchservicesPage {
    type: typeof ServicesActionsType.FETCH_SERVICES_PAGE;
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

export interface IAddServicRequest {
    type: typeof ServicesActionsType.ADD_NEW_SERVICE_REQUEST;
}

export interface IAddServicSuccess {
    type: typeof ServicesActionsType.ADD_NEW_SERVICE_SUCCESS;
    payload: { data: IService; message: string };
}
export interface IAddServicError {
    type: ServicesActionsType.ADD_NEW_SERVICE_ERROR;
    payload: {
        message: string;
    };
}
export interface IEditServicRequest {
    type: typeof ServicesActionsType.EDIT_SERVICE_REQUEST;
}
export interface IEditServicSuccess {
    type: typeof ServicesActionsType.EDIT_SERVICE_SUCCESS;
    payload: { data: IService; message: string };
}
export interface IEditServicError {
    type: ServicesActionsType.EDIT_SERVICE_ERROR;
    payload: {
        message: string;
    };
}

export interface IDeletServicRequest {
    type: typeof ServicesActionsType.DELET_SERVICE_REQUEST;
}
export interface IDeletServicSuccess {
    type: typeof ServicesActionsType.DELET_SERVICE_SUCCESS;
    payload: { _id: string; message: string };
}
export interface IDeletServicError {
    type: ServicesActionsType.DELET_SERVICE_ERROR;
    payload: {
        message: string;
    };
}
export type ServicesAction =
    | IFetchServicesRequest
    | IFetchServicesSuccess
    | IFetchServicesError
    | IClearMessageServices
    | IAddServicRequest
    | IAddServicSuccess
    | IAddServicError
    | IEditServicRequest
    | IEditServicSuccess
    | IEditServicError
    | IDeletServicRequest
    | IDeletServicSuccess
    | IDeletServicError;
