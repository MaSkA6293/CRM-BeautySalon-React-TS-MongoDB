import { CategoriesActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { clearMessageCategories } from "../actionCreators";
import { deletCategoryRequest, deletCategorySuccess, deletCategoryError } from "../actionCreators/deletCategory";
import { IRunDeletCategory } from "../contracts/types";

export function* deletCategorySaga() {
    yield takeLatest(CategoriesActionsType.DELET_CATEGORY, deletCategory);
}

export function* deletCategory(action: IRunDeletCategory) {
    try {
        yield put(deletCategoryRequest());
        const response = yield call(httpRequest, "api/services/categories", "DELETE", { _id: action.payload._id });
        yield put(deletCategorySuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageCategories());
    } catch (e) {
        yield put(deletCategoryError(e));
        yield delay(2000);
        yield put(clearMessageCategories());
    }
}
