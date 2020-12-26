import { IGlobalStore } from "../../reducers/rootReducer";
import { IstateCalendar } from "./contracts/state";
import { ISelectEventListToRender } from "./contracts/types";
import moment from "moment-business-days";
export const selectCalendarState = (state: IGlobalStore): IstateCalendar => state.calendar;

export const selectEventsList = (state: IGlobalStore): ISelectEventListToRender[] =>
    selectCalendarState(state).eventsList.map((el) => {
        return {
            ...el,
            start: moment(el.start, "HH:mm").toDate(),
            end: moment(el.end, "HH:mm").toDate(),
        };
    });
export const selectEventIsAdding = (state: IGlobalStore): boolean => selectCalendarState(state).eventIsAdding;
export const selectEventsIsFetching = (state: IGlobalStore): boolean => selectCalendarState(state).eventsIsFetching;
