import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CalendarActionsType } from "../contracts/actionTypes";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";
import { clientsRequestSuccess } from "../../clients/actionCreators/fetchClients";
import { SagaIterator } from "@redux-saga/core";
import { calendarClearMessage } from "../actionCreators";
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsError } from "../actionCreators/fetchEvents";

export function* fetchCalendarPageSaga(): SagaIterator {
    yield takeLatest(CalendarActionsType.FETCH_CALENDAR_PAGE, fetchCalendarPage);
}

export function* fetchCalendarPage(): SagaIterator {
    try {
        yield put(fetchEventsRequest());
        const [events, colors, clients] = yield all([
            call(httpRequest, "api/calendar/events", "GET"),
            call(httpRequest, "api/color", "GET"),
            call(httpRequest, "api/client", "GET"),
        ]);
        yield put(fetchEventsSuccess(events));
        yield put(fetchColorsSuccess(colors));
        yield put(clientsRequestSuccess(clients));
    } catch (e) {
        yield put(fetchEventsError(e));
        yield delay(4000);
        yield put(calendarClearMessage());
    }
}
