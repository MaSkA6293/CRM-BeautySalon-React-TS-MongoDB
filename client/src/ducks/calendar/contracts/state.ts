export interface IstateCalendar {
    readonly eventsList: IEvent[];
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
