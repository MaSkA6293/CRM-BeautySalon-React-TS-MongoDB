import { takeEvery } from 'redux-saga/effects'
import {
  CLIENTS_REQUEST,
  SERVICE_PAGE_REQUEST,
  EDIT_SERVIC,
  CATEGORY_PAGE_REQUEST,
  DELET_SERVICE
} from '../constants'
import { fetchClients } from "./fetchClients"
import { fetchServicePageData } from "./fetchServicePageData"
import { editService } from "./editService"
import { fetchCategoryPageData } from './fetchCategoryPageData'
import { deletServic } from './deletService'

export default function* rootSaga() {
  yield takeEvery(CLIENTS_REQUEST, fetchClients)
  yield takeEvery(SERVICE_PAGE_REQUEST, fetchServicePageData)
  yield takeEvery(EDIT_SERVIC, editService)
  yield takeEvery(DELET_SERVICE, deletServic)
  yield takeEvery(CATEGORY_PAGE_REQUEST, fetchCategoryPageData)
  // add serv
  // category add, edit, delet
}