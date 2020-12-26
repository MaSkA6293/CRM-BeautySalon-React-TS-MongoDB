import { CalendarActionsType } from "../contracts/actionTypes";
import { IFetchEventsRequest, IFetchEventsSuccess, IFetchEventErrorProps, IFetchEventError } from "../contracts/types";
import { IEvent } from "../contracts/state";

export const fetchEventsRequest = (): IFetchEventsRequest => {
    return { type: CalendarActionsType.FETCH_EVENTS_REQUEST };
};
export const fetchEventsSuccess = (response: { data: IEvent[] }): IFetchEventsSuccess => {
    return { type: CalendarActionsType.FETCH_EVENTS_SUCCESS, payload: response.data };
};

export const fetchEventsError = (e: IFetchEventErrorProps): IFetchEventError => {
    return {
        type: CalendarActionsType.FETCH_EVENTS_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
