import { CalendarActionsType } from "./actionTypes";
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
export type myEvent = {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
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
