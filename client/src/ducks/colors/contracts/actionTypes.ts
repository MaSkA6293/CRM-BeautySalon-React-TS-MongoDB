import { IColor } from "../contracts/state";
export enum ColorsActionsType {
    FETCH_COLORS = "colors/FETCH_COLORS",
    FETCH_COLORS_REQUEST = "colors/FETCH_COLORS_REQUEST",
    FETCH_COLORS_SUCCESS = "colors/FETCH_COLORS_SUCCESS",
    FETCH_COLORS_ERROR = "colors/FETCH_COLORS_ERROR",
}

export interface IRunFetchColors {
    type: typeof ColorsActionsType.FETCH_COLORS;
}
export interface IFetchColorsErrorProps {
    response: { data: { message: string } };
}

//actions
export interface IFetchColorsRequest {
    type: typeof ColorsActionsType.FETCH_COLORS_REQUEST;
}
export interface IFetchColorsSuccess {
    type: ColorsActionsType.FETCH_COLORS_SUCCESS;
    payload: IColor[];
}
export interface IFetchColorsError {
    type: ColorsActionsType.FETCH_COLORS_ERROR;
    payload: {
        message: string;
    };
}

export type ColorsAction = IFetchColorsRequest | IFetchColorsSuccess | IFetchColorsError;
