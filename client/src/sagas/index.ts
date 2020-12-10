import { all } from "redux-saga/effects";
// import {
//   CLIENTS_REQUEST,
//   SERVICE_PAGE_REQUEST,
//   EDIT_SERVIC,
//   CATEGORY_PAGE_REQUEST,
//   DELET_SERVICE,
//   ADD_SERVIC,
//   ADD_CATEGORY,
//   DELET_CATEGORY,
//   EDIT_CATEGORY,
//   ADD_CLIENT,
// } from "../constants";
// import { UserActionsType } from "../ducks/user/contracts/actionTypes"
// import { fetchClients } from "./pageClients/fetchClients";
// import { fetchServicePageData } from "./pageServices/fetchServicePageData";
// import { editService } from "./pageServices/editService";
// import { fetchCategoryPageData } from "./pageCategories/fetchCategoryPageData";
// import { deletServic } from "./pageServices/deletService";
// import { addService } from "./pageServices/addService";
// import { addCategory } from "./pageCategories/addCategory";
// import { deletCategory } from "./pageCategories/deletCategory";
// import { editCategory } from "./pageCategories/editCategory";
// import { signUp } from "../ducks/user/sagas/signUp";

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
    ]);
}
