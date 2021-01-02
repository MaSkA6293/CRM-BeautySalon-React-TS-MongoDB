import { CalendarActionsType } from "../contracts/actionTypes";
import { IEvent } from "../contracts/state";
interface IRunEditEvent {
    type: CalendarActionsType.EDIT_EVENT;
    payload: {
        event: IEvent;
        callback: () => void;
    };
}
export const runEditEvent = (event: IEvent, callback: () => void): IRunEditEvent => {
    return {
        type: CalendarActionsType.EDIT_EVENT,
        payload: {
            event,
            callback,
        },
    };
};

interface IEditEventRequest {
    type: typeof CalendarActionsType.EDIT_EVENT_REQUEST;
}

export const editEventRequest = (): IEditEventRequest => {
    return { type: CalendarActionsType.EDIT_EVENT_REQUEST };
};
interface IEditEventSuccess {
    type: typeof CalendarActionsType.EDIT_EVENT_SUCCESS;
    payload: { data: IEvent; message: string };
}
export const editEventSuccess = (res: { event: IEvent; message: string }): IEditEventSuccess => {
    return {
        type: CalendarActionsType.EDIT_EVENT_SUCCESS,
        payload: { data: res.event, message: res.message },
    };
};

interface IEditEventErrorProps {
    response: { data: { message: string } };
}
interface IEditEventError {
    type: CalendarActionsType.EDIT_EVENT_ERROR;
    payload: {
        message: string;
    };
}

export const editEventError = (e: IEditEventErrorProps): IEditEventError => {
    return {
        type: CalendarActionsType.EDIT_EVENT_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
