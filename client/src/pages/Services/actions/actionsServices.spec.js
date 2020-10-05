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
describe("Services action edit", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("editServiceRequest", () => {
    store.dispatch(editServiceRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_SERVIC_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("editServiceSuccess", () => {
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
    store.dispatch(editServiceSuccess(data));
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_SERVIC_SUCCESS,
        payload: { data: data.data, message: data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearEditServiceSuccess", () => {
    store.dispatch(clearEditServiceSuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_EDIT_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("editServiceFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(editServiceFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: EDIT_SERVIC_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearEditServiceError", () => {
    store.dispatch(clearEditServiceError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_EDIT_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});

describe("Services action delet", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("deletServiceRequest", () => {
    store.dispatch(deletServiceRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_SERVIC_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("deletServiceSuccess", () => {
    const data = {
      _id: "1",
      message: "Success",
    };
    store.dispatch(deletServiceSuccess(data));
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_SERVIC_SUCCESS,
        payload: { _id: data._id, message: data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearDeletServiceSuccess", () => {
    store.dispatch(clearDeletServiceSuccess());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_DELET_SUCCESS }];
    expect(actions).toEqual(expectActions);
  });

  it("deletServiceFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(deletServiceFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: DELET_SERVIC_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearDeletServiceError", () => {
    store.dispatch(clearDeletServiceError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_MESSAGE_SERVIC_DELET_FAIL }];
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

describe("Categories action get", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("getCategoriesRequest", () => {
    store.dispatch(getCategoriesRequest());
    const actions = store.getActions();
    const expectActions = [
      {
        type: GET_CATEGORIES_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("getCategoriesRequestSuccess", () => {
    const responsedata = [
      {
        _id: "1",
        name: "test name",
        colorId: "2",
      },
    ];

    store.dispatch(getCategoriesRequestSuccess(responsedata));
    const actions = store.getActions();
    const expectActions = [
      {
        type: GET_CATEGORIES_REQUEST_SUCCESS,
        payload: responsedata,
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("getCategoriesFail", () => {
    const error = { response: { data: { message: "some error" } } };
    store.dispatch(getCategoriesFail(error));
    const actions = store.getActions();
    const expectActions = [
      {
        type: GET_CATEGORIES_REQUEST_FAIL,
        payload: { message: error.response.data.message },
      },
    ];
    expect(actions).toEqual(expectActions);
  });

  it("clearGetCategoriesError", () => {
    store.dispatch(clearGetCategoriesError());
    const actions = store.getActions();
    const expectActions = [{ type: CLEAR_ERROR_GET_CATEGORIES_REQUEST_FAIL }];
    expect(actions).toEqual(expectActions);
  });
});
