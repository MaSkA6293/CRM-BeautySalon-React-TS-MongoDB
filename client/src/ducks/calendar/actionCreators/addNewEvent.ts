import { CalendarActionsType } from "../contracts/actionTypes";
import { IEventAdd } from "../contracts/types";
import { IEvent } from "../contracts/state";
interface IRunAddEvent {
    type: CalendarActionsType.ADD_NEW_EVENT;
    payload: {
        event: IEventAdd;
        callback: () => void;
    };
}

export const runAddNewEvent = (event: IEventAdd, callback: () => void): IRunAddEvent => {
    return {
        type: CalendarActionsType.ADD_NEW_EVENT,
        payload: { event, callback },
    };
};

interface IAddEventRequest {
    type: typeof CalendarActionsType.ADD_EVENT_REQUEST;
}
export const addEventRequest = (): IAddEventRequest => {
    return {
        type: CalendarActionsType.ADD_EVENT_REQUEST,
    };
};

interface IAddEventSuccess {
    type: CalendarActionsType.ADD_EVENT_SUCCESS;
    payload: {
        event: IEvent;
        message: string;
    };
}
export const addEventSuccess = (response: { event: IEvent; message: string }): IAddEventSuccess => {
    return {
        type: CalendarActionsType.ADD_EVENT_SUCCESS,
        payload: {
            event: response.event,
            message: response.message,
        },
    };
};

interface IAddEventError {
    type: CalendarActionsType.EVENT_ADD_ERROR;
    payload: {
        message: string;
    };
}
type IErrors = {
    msg: string;
};
interface IAddEventErrorProps {
    response: { data: { message: string; errors: IErrors[] } };
}

export const addEventError = (e: IAddEventErrorProps): IAddEventError => {
    let message = "";
    if (e.response.data.message) {
        message = e.response.data.message;
    }
    if (e.response.data.errors) {
        message = e.response.data.errors.map((el) => `${el.msg}`).join(" ");
    }
    return {
        type: CalendarActionsType.EVENT_ADD_ERROR,
        payload: {
            message,
        },
    };
};
