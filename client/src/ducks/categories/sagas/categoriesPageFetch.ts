import { call, all, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { CategoriesActionsType } from "../contracts/actionTypes";
import { fetchCategoriesRequest, fetchCategoriesError } from "../actionCreators/fetchCategories";
import { clearMessageCategories } from "../actionCreators";
import { fetchCategoriesSuccess } from "../actionCreators/fetchCategories";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";

export function* fetchCategoriesPageSaga(): Generator<any, any, any> {
    yield takeLatest(CategoriesActionsType.FETCH_CATEGORIES_PAGE, fetchCategoriesPage);
}

export function* fetchCategoriesPage(): Generator<any, any, any> {
    try {
        yield put(fetchCategoriesRequest());
        const [categories, colors] = yield all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
        ]);
        yield put(fetchCategoriesSuccess(categories));
        yield put(fetchColorsSuccess(colors));
    } catch (e) {
        yield put(fetchCategoriesError(e));
        yield delay(4000);
        yield put(clearMessageCategories());
    }
}
