import { CalendarActionsType } from "../contracts/actionTypes";
import { IRunCalendarPageFetch } from "../contracts/types";
export const runCalendarPageFetch = (): IRunCalendarPageFetch => {
    return { type: CalendarActionsType.FETCH_CALENDAR_PAGE };
};
