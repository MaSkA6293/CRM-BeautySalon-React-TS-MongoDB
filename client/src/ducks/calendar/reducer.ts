import { CalendarActionsType, CalendarsAction } from "./contracts/actionTypes";
import { IstateCalendar } from "./contracts/state";

const initialState: IstateCalendar = {
    eventIsAdding: false,
    calendarMessageSuccess: "",
    calendarMessageError: "",
    eventsIsFetching: false,
    eventIsDeleting: false,
    eventIsEditing: false,
    eventsList: [],
};
const stateCalendar = (state: IstateCalendar = initialState, action: CalendarsAction): IstateCalendar => {
    switch (action.type) {
        case CalendarActionsType.EDIT_EVENT_REQUEST:
            return {
                ...state,
                eventIsEditing: true,
            };
        case CalendarActionsType.EDIT_EVENT_SUCCESS:
            return {
                ...state,
                eventIsEditing: false,
                eventsList: state.eventsList.map((event) =>
                    event._id === action.payload.data._id ? action.payload.data : event,
                ),
                calendarMessageSuccess: action.payload.message,
            };
        case CalendarActionsType.EDIT_EVENT_ERROR:
            return {
                ...state,
                eventIsEditing: false,
                calendarMessageError: action.payload.message,
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
                eventsList: [...state.eventsList, action.payload.event],
                eventIsAdding: false,
                calendarMessageSuccess: action.payload.message,
            };

        case CalendarActionsType.EVENT_ADD_ERROR:
            return { ...state, eventIsAdding: false, calendarMessageError: action.payload.message };

        case CalendarActionsType.DELET_EVENT_REQUEST:
            return {
                ...state,
                eventIsDeleting: true,
            };
        case CalendarActionsType.DELET_EVENT_SUCCESS:
            return {
                ...state,
                eventsList: state.eventsList.filter((item) => item._id !== action.payload._id),
                eventIsDeleting: false,
                calendarMessageSuccess: action.payload.message,
            };
        case CalendarActionsType.DELET_EVENT_ERROR:
            return {
                ...state,
                eventIsDeleting: false,
                calendarMessageError: action.payload.message,
            };

        case CalendarActionsType.CLEAR_MESSAGE_CALENDAR:
            return { ...state, calendarMessageError: "", calendarMessageSuccess: "" };

        default:
            return state;
    }
};

export default stateCalendar;
