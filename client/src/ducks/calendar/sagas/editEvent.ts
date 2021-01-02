import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CalendarActionsType } from "../contracts/actionTypes";
import { editEventRequest, editEventSuccess, editEventError } from "../actionCreators/editEvent";
import { IEvent } from "../contracts/state";
import { calendarClearMessage } from "../actionCreators";
import { SagaIterator } from "@redux-saga/core";

export function* editEventSaga(): SagaIterator {
    yield takeLatest(CalendarActionsType.EDIT_EVENT, editEvent);
}

interface IEditEventProps {
    type: typeof CalendarActionsType.EDIT_EVENT;
    payload: {
        event: IEvent;
        callback: () => void;
    };
}
export function* editEvent(action: IEditEventProps): SagaIterator {
    try {
        yield put(editEventRequest());
        const response = yield call(
            httpRequest,
            `api/calendar/events/${action.payload.event._id}`,
            "PUT",
            action.payload.event,
        );
        yield put(editEventSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(calendarClearMessage());
    } catch (e) {
        yield put(editEventError(e));
        yield delay(2000);
        yield put(calendarClearMessage());
    }
}
