import { IColor } from "../contracts/state";
import { ColorsActionsType } from "../contracts/actionTypes";
import {
    IRunFetchColors,
    IFetchColorsRequest,
    IFetchColorsSuccess,
    IFetchColorsErrorProps,
    IFetchColorsError,
} from "../contracts/actionTypes";

export const runFetchColors = (): IRunFetchColors => {
    return { type: ColorsActionsType.FETCH_COLORS };
};

export const fetchColorsRequest = (): IFetchColorsRequest => {
    return { type: ColorsActionsType.FETCH_COLORS_REQUEST };
};

export const fetchColorsSuccess = (response: { data: IColor[] }): IFetchColorsSuccess => {
    return { type: ColorsActionsType.FETCH_COLORS_SUCCESS, payload: response.data };
};

export const fetchColorsError = (e: IFetchColorsErrorProps): IFetchColorsError => {
    return {
        type: ColorsActionsType.FETCH_COLORS_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
