import { CategoriesActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { clearMessageCategories } from "../actionCreators";
import { editCategoryRequest, editCategorySuccess, editCategoryError } from "../actionCreators/editCategory";
import { IEditCategory } from "../contracts/types";
import { SagaIterator } from "@redux-saga/core";
export function* editCategorySaga(): SagaIterator {
    yield takeLatest(CategoriesActionsType.EDIT_CATEGORY, editCategory);
}

export function* editCategory(action: IEditCategory): SagaIterator {
    try {
        yield put(editCategoryRequest());
        const response = yield call(httpRequest, "api/services/categories", "PUT", action.payload.data);
        yield put(editCategorySuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageCategories());
    } catch (e) {
        yield put(editCategoryError(e));
        yield delay(2000);
        yield put(clearMessageCategories());
    }
}
