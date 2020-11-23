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
import { signUpSaga } from "../ducks/user/sagas/signUp"
import { getUserSaga } from '../ducks/user/sagas/getUser'
import { signOutSaga } from "../ducks/user/sagas/signOut";
// import { addClient } from "./pageClients/addClient";

export default function* rootSaga() {
  yield all([signInSaga(), signUpSaga(), getUserSaga(), signOutSaga()])
  // //page clients
  // yield takeEvery(CLIENTS_REQUEST, fetchClients);
  // yield takeEvery(ADD_CLIENT, addClient)
  // //page services
  // yield takeEvery(SERVICE_PAGE_REQUEST, fetchServicePageData);
  // yield takeEvery(EDIT_SERVIC, editService);
  // yield takeEvery(DELET_SERVICE, deletServic);
  // yield takeEvery(ADD_SERVIC, addService);
  // //page categories
  // yield takeEvery(CATEGORY_PAGE_REQUEST, fetchCategoryPageData);
  // yield takeEvery(ADD_CATEGORY, addCategory);
  // yield takeEvery(DELET_CATEGORY, deletCategory);
  // yield takeEvery(EDIT_CATEGORY, editCategory);
  // //page Auth
  // yield takeEvery(UserActionsType.USER_SIGNUP, signUp);

  // yield takeEvery(UserActionsType.USER_SIGNOUT, signOut);
}
