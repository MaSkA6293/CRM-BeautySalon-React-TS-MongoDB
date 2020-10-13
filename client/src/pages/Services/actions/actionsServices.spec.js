import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../../reducers/services";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS,
  ADD_SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
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
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST_SUCCESS,
  GET_CATEGORIES_REQUEST_FAIL,
  CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS,
  EDIT_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_EDIT_FAIL,
  DELET_CATEGORY_REQUEST,
  DELET_CATEGORY_SUCCESS,
  CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS,
  DELET_CATEGORY_FAIL,
  CLEAR_MESSAGE_CATEGORY_DELET_FAIL, SERVICE_PAGE_REQUEST
} from "../../../constants";
import {
  addCategoryRequest,
  addCategorySuccess,
  clearAddCategorySuccess,
  addCategoryFail,
  clearAddCategoryError,
  addServiceRequest,
  addServiceSuccess,
  clearAddServiceSuccess,
  addServiceFail,
  clearAddServiceError,
  editServiceRequest,
  editServiceSuccess,
  clearEditServiceSuccess,
  editServiceFail,
  clearEditServiceError,
  deletServiceRequest,
  deletServiceSuccess,
  clearDeletServiceSuccess,
  deletServiceFail,
  clearDeletServiceError,
  getCategoriesRequest,
  getCategoriesRequestSuccess,
  getCategoriesFail,
  clearGetCategoriesError,
  editCategoryRequest,
  editCategorySuccess,
  clearEditCategorySuccess,
  editCategoryFail,
  clearEditCategoryError,
  deletCategoryRequest,
  deletCategorySuccess,
  clearDeletCategorySuccess,
  deletCategoryFail,
  clearDeletCategoryError, servicPageRequest
} from "./actionsServices";

const mockStore = configureStore([thunk]);

describe("Services action add", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("addServiceRequest", () => {
    store.dispatch(addServiceRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVIC_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("addServiceSuccess", () => {
    const data = {
      data: {
        id: 1,
        name: "haircut",
        duration: [1, 20],
        cost: 500,
        colorId: 4,
        categoriesId: ["222", "666"],
      },
      message: "Success",
    };
    store.dispatch(addServiceSuccess(data));
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVIC_SUCCESS,
        payload: { data: data.data, message: data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearAddServiceSuccess", () => {
    store.dispatch(clearAddServiceSuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_ADD_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("addServiceFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(addServiceFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVIC_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearAddServiceError", () => {
    store.dispatch(clearAddServiceError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_ADD_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});



describe("Categories action add", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("addCategoryRequest", () => {
    store.dispatch(addCategoryRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVICE_CATEGORY_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("addCategorySuccess", () => {
    const responsedata = {
      data: {
        _id: "1",
        name: "test name",
        colorId: "2",
      },
      message: "Success",
    };
    store.dispatch(addCategorySuccess(responsedata));
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVICE_CATEGORY_SUCCESS,
        payload: {
          data: {
            _id: responsedata.data._id,
            name: responsedata.data.name,
            colorId: responsedata.data.colorId,
          },
          message: responsedata.message,
        },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearAddCategorySuccess", () => {
    store.dispatch(clearAddCategorySuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_CATEGORY_ADD_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("addCategoryFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(addCategoryFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: SERVICE_CATEGORY_ADD_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearAddCategoryError", () => {
    store.dispatch(clearAddCategoryError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_SERVICE_CATEGORY_ADD_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});


describe("Category action edit", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("editCategoryRequest", () => {
    store.dispatch(editCategoryRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_CATEGORY_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("editCategorySuccess", () => {
    const data = {
      data: {
        id: 1,
        name: "haircut",
        colorId: 4,
      },
      message: "Success",
    };
    store.dispatch(editCategorySuccess(data));
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_CATEGORY_SUCCESS,
        payload: { data: data.data, message: data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearEditCategorySuccess", () => {
    store.dispatch(clearEditCategorySuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_CATEGORY_EDIT_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("editCategoryFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(editCategoryFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_CATEGORY_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearEditCategoryError", () => {
    store.dispatch(clearEditCategoryError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_CATEGORY_EDIT_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});

describe("Category action delet", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("deletCategoryRequest", () => {
    store.dispatch(deletCategoryRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_CATEGORY_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("deletServiceSuccess", () => {
    const data = {
      _id: "1",
      message: "Success",
    };
    store.dispatch(deletCategorySuccess(data));
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_CATEGORY_SUCCESS,
        payload: { _id: data._id, message: data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearDeletCategorySuccess", () => {
    store.dispatch(clearDeletCategorySuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_CATEGORY_DELET_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("deletCategoryFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(deletCategoryFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_CATEGORY_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearDeletCategoryError", () => {
    store.dispatch(clearDeletCategoryError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_CATEGORY_DELET_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});



