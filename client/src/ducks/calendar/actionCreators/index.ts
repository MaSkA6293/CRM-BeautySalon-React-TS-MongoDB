import { CalendarActionsType } from "../contracts/actionTypes";

export const calendarClearMessage = (): ICalendarClearMessage => {
    return { type: CalendarActionsType.CLEAR_MESSAGE_CALENDAR };
};
interface ICalendarClearMessage {
    type: typeof CalendarActionsType.CLEAR_MESSAGE_CALENDAR;
}
