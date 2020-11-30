import { call, all, put, delay, takeLatest } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { ServicesActionsType } from "../contracts/actionTypes";
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesError } from "../actionCreators/fetchServices";
import { clearMessageServices } from "../actionCreators";
import { fetchCategoriesSuccess } from "../../categories/actionCreators/fetchCategories";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";

export function* fetchServicesPageSaga(): Generator<any, any, any> {
    yield takeLatest(ServicesActionsType.FETCH_SERVICES_PAGE, fetchServicesPage);
}

export function* fetchServicesPage(): Generator<any, any, any> {
    try {
        yield put(fetchServicesRequest());
        const [categories, colors, services] = yield all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
            call(httpRequest, "api/services", "GET"),
        ]);
        yield put(fetchCategoriesSuccess(categories));
        yield put(fetchColorsSuccess(colors));
        yield put(fetchServicesSuccess(services));
    } catch (e) {
        yield put(fetchServicesError(e));
        yield delay(4000);
        yield put(clearMessageServices());
    }
}
