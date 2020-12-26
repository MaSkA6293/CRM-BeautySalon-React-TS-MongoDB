import { call, put, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CalendarActionsType } from "../contracts/actionTypes";
// import { fetchCategoriesRequest, fetchCategoriesError } from "../actionCreators/fetchCategories";
// import { clearMessageCategories } from "../actionCreators";
// import { fetchCategoriesSuccess } from "../actionCreators/fetchCategories";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";
import { SagaIterator } from "@redux-saga/core";

export function* fetchCalendarPageSaga(): SagaIterator {
    yield takeLatest(CalendarActionsType.FETCH_CALENDAR_PAGE, fetchCalendarPage);
}

export function* fetchCalendarPage(): SagaIterator {
    try {
        //  yield put(fetchCategoriesRequest());
        const colors = yield call(httpRequest, "api/color", "GET");
        //  yield put(fetchCategoriesSuccess(categories));
        yield put(fetchColorsSuccess(colors));
    } catch (e) {
        //  yield put(fetchCategoriesError(e));
        // yield delay(4000);
        // yield put(clearMessageCategories());
    }
}
