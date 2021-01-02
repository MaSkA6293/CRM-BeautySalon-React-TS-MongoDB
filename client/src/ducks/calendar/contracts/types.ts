import { CalendarActionsType } from "./actionTypes";
import { IEvent } from "../contracts/state";
export interface IEventToRender {
    _id: string;
    title: string;
    dayStart: string;
    dayEnd: string;
    start: string;
    end: string;
    allDay: boolean;
}
export type myNewEvent = {
    day: string;
    start: string;
    end: string;
};

export type ISelectEventListToRender = {
    _id: string;
    title: string;
    allDay: boolean;
    day: string;
    start: Date;
    end: Date;
    color: string;
};
export type IEventAdd = {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
};

export interface IRunCalendarPageFetch {
    type: typeof CalendarActionsType.FETCH_CALENDAR_PAGE;
}

export interface IFetchEventsSuccess {
    type: CalendarActionsType.FETCH_EVENTS_SUCCESS;
    payload: IEvent[];
}
export interface IFetchEventErrorProps {
    response: { data: { message: string } };
}
export interface IFetchEventError {
    type: CalendarActionsType.FETCH_EVENTS_ERROR;
    payload: {
        message: string;
    };
}

export interface IFetchEventsRequest {
    type: typeof CalendarActionsType.FETCH_EVENTS_REQUEST;
}
