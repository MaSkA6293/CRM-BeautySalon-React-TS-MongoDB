import { call, put, takeLatest, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CalendarActionsType } from "../contracts/actionTypes";
import { addEventRequest, addEventSuccess, addEventError } from "../actionCreators/addNewEvent";

import { calendarClearMessage } from "../actionCreators";
import { IEventAdd } from "../contracts/types";
import { SagaIterator } from "@redux-saga/core";

export function* addNewEventSaga(): SagaIterator {
    yield takeLatest(CalendarActionsType.ADD_NEW_EVENT, addEvent);
}

interface IAddEventProps {
    type: typeof CalendarActionsType.ADD_NEW_EVENT;
    payload: {
        event: IEventAdd;
        callback: () => void;
    };
}
export function* addEvent(action: IAddEventProps): SagaIterator {
    try {
        yield put(addEventRequest());
        const response = yield call(httpRequest, "api/calendar/events", "POST", action.payload.event);
        yield put(addEventSuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(calendarClearMessage());
    } catch (e) {
        yield put(addEventError(e));
        yield delay(2000);
        yield put(calendarClearMessage());
    }
}
