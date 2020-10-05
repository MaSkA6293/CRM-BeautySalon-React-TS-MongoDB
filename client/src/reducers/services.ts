import { IstateService } from "../pages/Services/types";
import { ServiceActionTypes } from "../pages/Services/types";

import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_REQUEST_SUCCESS,
  GET_SERVICES_REQUEST_FAIL,
  CLEAR_ERROR_GET_SERVICES_REQUEST_FAIL,
  ADD_SERVIC_REQUEST,
  ADD_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
  ADD_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_ADD_FAIL,
  EDIT_SERVIC_REQUEST,
  EDIT_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS,
  EDIT_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_EDIT_FAIL,
  DELET_SERVIC_REQUEST,
  DELET_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_DELET_SUCCESS,
  DELET_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_DELET_FAIL,
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_SUCCESS,
  GET_CATEGORIES_REQUEST_FAIL,
  CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL,
} from "../constants";

export const initialState: IstateService = {
  categoryIsAdded: false,
  categoryAdded: false,
  categoryAddIsFail: false,
  categoryAddError: false,

  categoriesIsLoading: false,
  categoriesLoaded: false,
  categoryList: [],

  servicesList: [],
  servicesIsLoading: true,
  servicesLoaded: false,
  servicesGetIsFail: false,
  servicesGetError: "",

  serviceIsAdded: false,
  serviceAdded: false,
  serviceMessageSuccess: "",
  serviceMessageFail: "",

  serviceIsEdited: false,
  serviceEdited: false,

  serviceIsDeleted: false,
  serviceDeleted: false,
};

const stateServices = (
  state: IstateService = initialState,
  action: ServiceActionTypes
) => {
  switch (action.type) {
    case GET_SERVICES_REQUEST:
      return {
        ...state,
        servicesIsLoading: true,
        servicesLoaded: false,
        servicesList: [],
      };
    case GET_SERVICES_REQUEST_SUCCESS:
      return {
        ...state,
        servicesIsLoading: false,
        servicesLoaded: true,
        servicesList: action.payload,
      };
    case GET_SERVICES_REQUEST_FAIL:
      return {
        ...state,
        servicesIsLoading: false,
        servicesGetIsFail: true,
        servicesGetError: action.payload.message,
      };
    case CLEAR_ERROR_GET_SERVICES_REQUEST_FAIL:
      return {
        ...state,
        servicesGetIsFail: false,
        servicesGetError: "",
      };
    case ADD_SERVIC_REQUEST:
      return { ...state, serviceIsAdded: true, serviceAdded: false };
    case ADD_SERVIC_SUCCESS:
      return {
        ...state,
        serviceIsAdded: false,
        serviceAdded: true,
        servicesList: [...state.servicesList, action.payload.data],
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_MESSAGE_SERVIC_ADD_SUCCESS:
      return {
        ...state,
        serviceMessageSuccess: "",
      };
    case ADD_SERVIC_FAIL:
      return { ...state, serviceMessageFail: action.payload.message };
    case CLEAR_MESSAGE_SERVIC_ADD_FAIL:
      return { ...state, serviceMessageFail: "" };

    case EDIT_SERVIC_REQUEST:
      return { ...state, serviceIsEdited: true, serviceEdited: false };
    case EDIT_SERVIC_SUCCESS:
      return {
        ...state,
        serviceIsEdited: false,
        serviceEdited: true,
        servicesList: state.servicesList.map((servic) =>
          servic._id === action.payload.data._id ? action.payload.data : servic
        ),
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS:
      return {
        ...state,
        serviceMessageSuccess: "",
      };
    case EDIT_SERVIC_FAIL:
      return { ...state, serviceMessageFail: action.payload.message };
    case CLEAR_MESSAGE_SERVIC_EDIT_FAIL:
      return { ...state, serviceMessageFail: "" };

    case DELET_SERVIC_REQUEST:
      return { ...state, serviceIsDeleted: true, serviceDeleted: false };
    case DELET_SERVIC_SUCCESS:
      return {
        ...state,
        serviceIsDeleted: false,
        serviceDeleted: true,
        servicesList: state.servicesList.filter(
          (servic) => servic._id !== action.payload._id
        ),
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_MESSAGE_SERVIC_DELET_SUCCESS:
      return {
        ...state,
        serviceMessageSuccess: "",
      };
    case DELET_SERVIC_FAIL:
      return { ...state, serviceMessageFail: action.payload.message };
    case CLEAR_MESSAGE_SERVIC_DELET_FAIL:
      return { ...state, serviceMessageFail: "" };

    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categoriesIsLoading: true,
        categoriesLoaded: false,
        categoryList: [],
      };
    case GET_CATEGORIES_REQUEST_SUCCESS:
      return {
        ...state,
        categoriesIsLoading: false,
        categoriesLoaded: true,
        categoryList: action.payload,
      };
    case GET_CATEGORIES_REQUEST_FAIL:
      return {
        ...state,
        categoriesIsLoading: false,
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL:
      return {
        ...state,
        servicesGetIsFail: false,
        servicesGetError: "",
      };

    case ADD_SERVICE_CATEGORY_REQUEST:
      return { ...state, categoryIsAdded: true, categoryAdded: false };
    case ADD_SERVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryIsAdded: false,
        categoryAdded: true,
        categoryList: [...state.categoryList, action.payload.data],
        serviceMessageSuccess: action.payload.message,
      };
    case CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS:
      return {
        ...state,
        serviceMessageSuccess: "",
      };
    case SERVICE_CATEGORY_ADD_FAIL:
      return { ...state, serviceMessageFail: action.payload.message };
    case CLEAR_SERVICE_CATEGORY_ADD_FAIL:
      return { ...state, serviceMessageFail: "" };

    default:
      return state;
  }
};

export default stateServices;
