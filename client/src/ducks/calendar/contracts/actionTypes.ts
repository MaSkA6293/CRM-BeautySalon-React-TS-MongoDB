import { IEvent } from "./state";
export enum CalendarActionsType {
    FETCH_EVENTS = "calendar/FETCH_EVENTS",
    CALENDAR_REQUEST = "calendar/CALENDAR_REQUEST",
    CALENDAR_REQUEST_SUCCESS = "calendar/CALENDAR_REQUEST_SUCCESS",
    CALENDAR_REQUEST_ERROR = "calendar/CALENDAR_REQUEST_ERROR",

    EDIT_EVENT = "EDIT_EVENT",
    EDIT_EVENT_REQUEST = "EDIT_EVENT_REQUEST",
    EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS",
    EDIT_EVENT_ERROR = "EDIT_EVENT_ERROR",

    FETCH_CALENDAR_PAGE = "FETCH_CALENDAR_PAGE",

    FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST",
    FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS",
    FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR",

    ADD_NEW_EVENT = "ADD_NEW_EVENT",
    ADD_EVENT_REQUEST = "ADD_EVENT_REQUEST",
    ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS",
    EVENT_ADD_ERROR = "EVENT_ADD_ERROR",

    DELET_EVENT = "DELET_EVENT",
    DELET_EVENT_REQUEST = "DELET_EVENT_REQUEST",
    DELET_EVENT_SUCCESS = "DELET_EVENT_SUCCESS",
    DELET_EVENT_ERROR = "DELET_EVENT_ERROR",

    CLEAR_MESSAGE_CALENDAR = "CLEAR_MESSAGE_CALENDAR",
}
// all
interface IRequestCalendarAction {
    type: typeof CalendarActionsType.CALENDAR_REQUEST;
}
interface IRequestCalendarSuccess {
    type: typeof CalendarActionsType.CALENDAR_REQUEST_SUCCESS;
    payload: IEvent[];
}
interface IRequestCalendarError {
    type: typeof CalendarActionsType.CALENDAR_REQUEST_ERROR;
    payload: Error;
}
interface IEditEvent {
    type: typeof CalendarActionsType.EDIT_EVENT;
    payload: IEvent;
}

//all
export interface IClearMessageCalendar {
    type: typeof CalendarActionsType.CLEAR_MESSAGE_CALENDAR;
}

//add event

export interface IAddEventRequest {
    type: typeof CalendarActionsType.ADD_EVENT_REQUEST;
}

export interface IAddEventSuccess {
    type: typeof CalendarActionsType.ADD_EVENT_SUCCESS;
    payload: { event: IEvent; message: string };
}
export interface IAddEventError {
    type: CalendarActionsType.EVENT_ADD_ERROR;
    payload: {
        message: string;
    };
}

// fetch events

export interface IFetchCategoriesRequest {
    type: typeof CalendarActionsType.FETCH_EVENTS_REQUEST;
}
export interface IFetchCategoriesSuccess {
    type: CalendarActionsType.FETCH_EVENTS_SUCCESS;
    payload: IEvent[];
}
export interface IFetchCategoriesError {
    type: CalendarActionsType.FETCH_EVENTS_ERROR;
    payload: {
        message: string;
    };
}

// delet event
export interface IDeletEventRequest {
    type: typeof CalendarActionsType.DELET_EVENT_REQUEST;
}
export interface IDeletEventSuccess {
    type: typeof CalendarActionsType.DELET_EVENT_SUCCESS;
    payload: { _id: string; message: string };
}
export interface IDeletEventError {
    type: CalendarActionsType.DELET_EVENT_ERROR;
    payload: {
        message: string;
    };
}

//edit

interface IEditEventRequest {
    type: typeof CalendarActionsType.EDIT_EVENT_REQUEST;
}
interface IEditEventSuccess {
    type: typeof CalendarActionsType.EDIT_EVENT_SUCCESS;
    payload: { data: IEvent; message: string };
}
interface IEditEventError {
    type: typeof CalendarActionsType.EDIT_EVENT_ERROR;
    payload: { message: string };
}

export type CalendarsAction =
    | IRequestCalendarAction
    | IRequestCalendarSuccess
    | IRequestCalendarError
    | IEditEvent
    | IAddEventRequest
    | IAddEventSuccess
    | IAddEventError
    | IClearMessageCalendar
    | IFetchCategoriesRequest
    | IFetchCategoriesSuccess
    | IFetchCategoriesError
    | IDeletEventRequest
    | IDeletEventSuccess
    | IDeletEventError
    | IEditEventRequest
    | IEditEventSuccess
    | IEditEventError;
