import { CalendarActionsType, CalendarsAction } from "./contracts/actionTypes";
import { IstateCalendar } from "./contracts/state";

const initialState: IstateCalendar = {
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
        case CalendarActionsType.ADD_NEW_EVENT:
            return {
                ...state,
                eventsList: [...state.eventsList, action.payload],
            };
        default:
            return state;
    }
};

export default stateCalendar;
