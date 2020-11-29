import { httpRequest } from "../../../utils/network";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CategoriesActionsType } from "../contracts/actionTypes";
import { clearMessageCategories } from "../actionCreators";
import {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesError,
} from "../actionCreators/fetchCategories";

export function* fetchCategoriesSaga() {
    yield takeLatest(CategoriesActionsType.FETCH_CATEGORIES, fetchCategories);
}

export function* fetchCategories(): Generator<any, any, any> {
    try {
        yield put(fetchCategoriesRequest());
        const categories = yield call(httpRequest, "api/services/categories", "GET");
        yield put(fetchCategoriesSuccess(categories));
    } catch (e) {
        yield put(fetchCategoriesError(e));
        yield delay(2000);
        yield put(clearMessageCategories());
    }
}
