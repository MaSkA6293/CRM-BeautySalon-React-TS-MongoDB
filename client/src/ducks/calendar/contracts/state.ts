export interface IstateCalendar {
    readonly eventsList: IEvent[];
    readonly eventIsAdding: boolean;
    readonly calendarMessageSuccess: string;
    readonly calendarMessageError: string;
    readonly eventsIsFetching: boolean;
}

export interface IEvent {
    _id: string;
    title: string;
    day: string;
    start: string;
    end: string;
    allDay: boolean;
    color: string;
}