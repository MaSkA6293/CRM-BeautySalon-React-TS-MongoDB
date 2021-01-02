import { CalendarActionsType } from "../contracts/actionTypes";

interface IRunDeletEvent {
    type: CalendarActionsType.DELET_EVENT;
    payload: {
        _id: string;
        callback: () => void;
    };
}
export const runDeletEvent = (_id: string, callback: () => void): IRunDeletEvent => {
    return {
        type: CalendarActionsType.DELET_EVENT,
        payload: {
            _id,
            callback,
        },
    };
};
interface IDeletEventRequest {
    type: typeof CalendarActionsType.DELET_EVENT_REQUEST;
}
export const deletEventRequest = (): IDeletEventRequest => {
    return {
        type: CalendarActionsType.DELET_EVENT_REQUEST,
    };
};

interface IDeletEventSuccess {
    type: CalendarActionsType.DELET_EVENT_SUCCESS;
    payload: {
        _id: number;
        message: string;
    };
}
export const deletEventSuccess = (response: { _id: number; message: string }): IDeletEventSuccess => {
    return {
        type: CalendarActionsType.DELET_EVENT_SUCCESS,
        payload: {
            _id: response._id,
            message: response.message,
        },
    };
};

interface IdeletEventError {
    type: CalendarActionsType.DELET_EVENT_ERROR;
    payload: {
        message: string;
    };
}
interface IAddEventFailProps {
    response: { data: { message: string } };
}

export const deletEventError = (e: IAddEventFailProps): IdeletEventError => {
    return {
        type: CalendarActionsType.DELET_EVENT_ERROR,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
