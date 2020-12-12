import { CategoriesActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { clearMessageCategories } from "../actionCreators";
import { addCategoryRequest, addCategorySuccess, addCategoryError } from "../actionCreators/addCategory";
import { IAddCategory } from "../contracts/types";
import { SagaIterator } from "@redux-saga/core";

export function* addCategorySaga(): SagaIterator {
    yield takeLatest(CategoriesActionsType.ADD_CATEGORY, addCategory);
}

export function* addCategory(action: IAddCategory): SagaIterator {
    try {
        yield put(addCategoryRequest());
        const response = yield call(httpRequest, "api/services/categories", "POST", action.payload.data);
        yield put(addCategorySuccess(response.data));
        yield call(action.payload.callback);
        yield delay(3000);
        yield put(clearMessageCategories());
    } catch (e) {
        yield put(addCategoryError(e));
        yield delay(2000);
        yield put(clearMessageCategories());
    }
}
