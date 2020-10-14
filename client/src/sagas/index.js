import { takeEvery } from 'redux-saga/effects'
import {
  CLIENTS_REQUEST,
  SERVICE_PAGE_REQUEST,
  EDIT_SERVIC,
  CATEGORY_PAGE_REQUEST,
  DELET_SERVICE,
  ADD_SERVIC,
  ADD_CATEGORY,
  DELET_CATEGORY,
  EDIT_CATEGORY
} from '../constants'
import { fetchClients } from "./fetchClients"
import { fetchServicePageData } from "./pageServices/fetchServicePageData"
import { editService } from "./pageServices/editService"
import { fetchCategoryPageData } from './pageCategories/fetchCategoryPageData'
import { deletServic } from './pageServices/deletService'
import { addService } from "./pageServices/addService"
import { addCategory } from './pageCategories/addCategory'
import { deletCategory } from "./pageCategories/deletCategory"
import { editCategory } from './pageCategories/editCategory'
export default function* rootSaga() {
  //page clients
  yield takeEvery(CLIENTS_REQUEST, fetchClients)
  //page services
  yield takeEvery(SERVICE_PAGE_REQUEST, fetchServicePageData)
  yield takeEvery(EDIT_SERVIC, editService)
  yield takeEvery(DELET_SERVICE, deletServic)
  yield takeEvery(ADD_SERVIC, addService)
  //page categories
  yield takeEvery(CATEGORY_PAGE_REQUEST, fetchCategoryPageData)
  yield takeEvery(ADD_CATEGORY, addCategory)
  yield takeEvery(DELET_CATEGORY, deletCategory)
  yield takeEvery(EDIT_CATEGORY, editCategory)
  //page Auth 
}