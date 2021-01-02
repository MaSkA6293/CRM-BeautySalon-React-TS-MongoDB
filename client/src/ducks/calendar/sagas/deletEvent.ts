import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CalendarActionsType } from "../contracts/actionTypes";
import { calendarClearMessage } from "../actionCreators";
import { deletEventRequest, deletEventSuccess, deletEventError } from "../actionCreators/deletEvent";
import { SagaIterator } from "@redux-saga/core";

export function* deletEventSaga(): SagaIterator {
    yield takeLatest(CalendarActionsType.DELET_EVENT, deletEvent);
}

interface IDeletEvent {
    type: typeof CalendarActionsType.DELET_EVENT;
    payload: {
        _id: number;
        callback: () => void;
    };
}
export function* deletEvent(action: IDeletEvent): SagaIterator {
    try {
        yield put(deletEventRequest());
        const response = yield call(httpRequest, `api/calendar/events/${action.payload._id}`, "DELETE");
        yield put(deletEventSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(calendarClearMessage());
    } catch (e) {
        yield put(deletEventError(e));
        yield delay(2000);
        yield put(calendarClearMessage());
    }
}
