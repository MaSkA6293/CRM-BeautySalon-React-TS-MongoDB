import { CalendarActionsType } from "../contracts/actionTypes";
export const editEvent = (data: any) => {
    return {
        type: CalendarActionsType.EDIT_EVENT,
        payload: data,
    };
};
