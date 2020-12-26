import { CalendarActionsType } from "../contracts/actionTypes";
import { IEventAdd } from "../contracts/types";
export const addNewEvent = (data: IEventAdd) => {
    function randomInt(min: number, max: number): number {
        return min + Math.floor((max - min) * Math.random());
    }
    return {
        type: CalendarActionsType.ADD_NEW_EVENT,
        payload: { ...data, _id: randomInt(1, 200000).toString() },
    };
};
