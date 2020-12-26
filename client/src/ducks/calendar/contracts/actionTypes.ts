import { IEvent } from "./state";
export enum CalendarActionsType {
    FETCH_EVENTS = "calendar/FETCH_EVENTS",
    CALENDAR_REQUEST = "calendar/CALENDAR_REQUEST",
    CALENDAR_REQUEST_SUCCESS = "calendar/CALENDAR_REQUEST_SUCCESS",
    CALENDAR_REQUEST_ERROR = "calendar/CALENDAR_REQUEST_ERROR",
    EDIT_EVENT = "EDIT_EVENT",
    ADD_NEW_EVENT = "ADD_NEW_EVENT",
    FETCH_CALENDAR_PAGE = "FETCH_CALENDAR_PAGE",
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
interface IAddEvent {
    type: typeof CalendarActionsType.ADD_NEW_EVENT;
    payload: IEvent;
}

export type CalendarsAction =
    | IRequestCalendarAction
    | IRequestCalendarSuccess
    | IRequestCalendarError
    | IEditEvent
    | IAddEvent;
