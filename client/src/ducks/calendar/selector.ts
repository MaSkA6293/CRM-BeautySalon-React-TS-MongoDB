import { IGlobalStore } from "../../reducers/rootReducer";
import { IstateCalendar } from "./contracts/state";
import { ISelectEventListToRender } from "./contracts/types";
import moment from "moment-business-days";

export const selectCalendarState = (state: IGlobalStore): IstateCalendar => state.calendar;
export const selectEventsList = (state: IGlobalStore): ISelectEventListToRender[] =>
    selectCalendarState(state).eventsList.map((el) => {
        let clientName = "";
        if (el.clientId !== "new") {
            const issetClient = state.clients.clientsList.find((cl) => cl._id === el.clientId);
            clientName = issetClient !== undefined ? issetClient.name : "Новый клиент";
        } else {
            clientName = "Новый клиент";
        }

        return {
            ...el,
            start: moment(`${el.day} ${el.start}`, "YYYYMMDD HH:mm").toDate(),
            end: moment(`${el.day} ${el.end}`, "YYYYMMDD HH:mm").toDate(),
            clientName,
        };
    });
export const selectEventIsAdding = (state: IGlobalStore): boolean => selectCalendarState(state).eventIsAdding;
export const selectEventsIsFetching = (state: IGlobalStore): boolean => selectCalendarState(state).eventsIsFetching;

export const selectCalendarMessageSuccess = (state: IGlobalStore): string =>
    selectCalendarState(state).calendarMessageSuccess;
export const selectCalendarMessageError = (state: IGlobalStore): string =>
    selectCalendarState(state).calendarMessageError;
export const selectEventIsDeleting = (state: IGlobalStore): boolean => selectCalendarState(state).eventIsDeleting;
export const selectEventIsEditing = (state: IGlobalStore): boolean => selectCalendarState(state).eventIsEditing;
