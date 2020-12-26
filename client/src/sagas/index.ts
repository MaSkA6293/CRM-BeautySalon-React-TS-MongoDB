import { all } from "redux-saga/effects";

import { signInSaga } from "../ducks/user/sagas/signIn";
import { signUpSaga } from "../ducks/user/sagas/signUp";
import { getUserSaga } from "../ducks/user/sagas/getUser";
import { signOutSaga } from "../ducks/user/sagas/signOut";
import { fetchClientsSaga } from "../ducks/clients/sagas/fetchClients";
import { addClientSaga } from "../ducks/clients/sagas/addClient";
import { editClientSaga } from "../ducks/clients/sagas/editClient";
import { deletClientSaga } from "../ducks/clients/sagas/deletClient";
import { fetchServicesSaga } from "../ducks/services/sagas/fetchServices";
import { fetchServicesPageSaga } from "../ducks/services/sagas/servicesPageFetch";
import { fetchCategoriesPageSaga } from "../ducks/categories/sagas/categoriesPageFetch";
import { addCategorySaga } from "../ducks/categories/sagas/addCategory";
import { editCategorySaga } from "../ducks/categories/sagas/editCategory";
import { deletCategorySaga } from "../ducks/categories/sagas/deletCategory";
import { addNewServiceSaga } from "../ducks/services/sagas/addNewService";
import { editServiceSaga } from "../ducks/services/sagas/editService";
import { deletServiceSaga } from "../ducks/services/sagas/deletService";
import { fetchCalendarPageSaga } from "../ducks/calendar/sagas/calendarPageFetch";
export default function* rootSaga() {
    yield all([
        signInSaga(),
        signUpSaga(),
        getUserSaga(),
        signOutSaga(),
        fetchClientsSaga(),
        addClientSaga(),
        editClientSaga(),
        deletClientSaga(),
        fetchServicesSaga(),
        fetchServicesPageSaga(),
        fetchCategoriesPageSaga(),
        addCategorySaga(),
        editCategorySaga(),
        deletCategorySaga(),
        addNewServiceSaga(),
        editServiceSaga(),
        deletServiceSaga(),
        fetchCalendarPageSaga(),
    ]);
}
