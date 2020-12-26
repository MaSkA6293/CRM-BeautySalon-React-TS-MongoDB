import { CalendarActionsType, CalendarsAction } from "./contracts/actionTypes";
import { IstateCalendar } from "./contracts/state";

const initialState: IstateCalendar = {
    eventIsAdding: false,
    calendarMessageSuccess: "",
    calendarMessageError: "",
    eventsIsFetching: false,
    eventsList: [
        {
            _id: "1",
            title: "first event",
            allDay: false,
            day: "2020 12 26",
            start: "09:30:26",
            end: "12:30:26",
            color: "#e2b6b6",
        },
        {
            _id: "2",
            title: "second event",
            allDay: false,
            day: "2020 12 26",
            start: "14:30",
            end: "16:30",
            color: "blue",
        },
    ],
};
const stateCalendar = (state: IstateCalendar = initialState, action: CalendarsAction): IstateCalendar => {
    switch (action.type) {
        case CalendarActionsType.EDIT_EVENT:
            return {
                ...state,
                eventsList: state.eventsList.map((el) => {
                    if (el._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return el;
                    }
                }),
            };

        case CalendarActionsType.FETCH_EVENTS_REQUEST:
            return { ...state, eventsIsFetching: true };
        case CalendarActionsType.FETCH_EVENTS_SUCCESS:
            return { ...state, eventsIsFetching: false, eventsList: action.payload };
        case CalendarActionsType.FETCH_EVENTS_ERROR:
            return { ...state, eventsIsFetching: false, calendarMessageError: action.payload.message };

        case CalendarActionsType.ADD_EVENT_REQUEST:
            return { ...state, eventIsAdding: true };

        case CalendarActionsType.ADD_EVENT_SUCCESS:
            return {
                ...state,
                eventsList: [...state.eventsList, action.payload.data],
                eventIsAdding: false,
                calendarMessageSuccess: action.payload.message,
            };

        case CalendarActionsType.EVENT_ADD_ERROR:
            return { ...state, eventIsAdding: false, calendarMessageError: action.payload.message };

        case CalendarActionsType.CLEAR_MESSAGE_CALENDAR:
            return { ...state, calendarMessageError: "", calendarMessageSuccess: "" };

        default:
            return state;
    }
};

export default stateCalendar;
