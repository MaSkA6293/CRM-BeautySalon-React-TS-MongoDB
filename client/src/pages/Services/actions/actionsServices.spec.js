import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../../reducers/services";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY,
  ADD_SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
  ADD_SERVIC_REQUEST,
  ADD_SERVIC_SUCCESS,
  CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
  ADD_SERVIC_FAIL,
  CLEAR_MESSAGE_SERVIC_ADD_FAIL,
} from "../../../constants";
import {
  addCategory,
  getColors,
  addServiceRequest,
  addServiceSuccess,
  clearAddServiceSuccess,
  addServiceFail,
  clearAddServiceError,
} from "./actionsServices";
import * as API from "../../../utils/network";

const mockStore = configureStore([thunk]);

describe("Categories action", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it("addCategory", async () => {
    const mockCategory = {
      name: "first",
      comment: "",
      color: "black",
    };
    API.httpRequest = jest.fn(() => {
      return Promise.reject({
        json: () => Promise.resolve([mockCategory]),
      });
    });
    await store.dispatch(addCategory(mockCategory));
    const actions = store.getActions();
    const expectActions = [
      {
        type: ADD_SERVICE_CATEGORY_REQUEST,
      },
    ];
    expect(actions).toEqual(expectActions);
  });
});

describe("Services action", () => {
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
        payload: { data, message: data.message },
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
