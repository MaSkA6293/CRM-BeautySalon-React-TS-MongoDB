import regeneratorRuntime from "regenerator-runtime";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../../reducers/services";
import {
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY,
  ADD_SERVICE_CATEGORY_SUCCESS,
  SERVICE_CATEGORY_ADD_FAIL,
  CLEAR_SERVICE_CATEGORY_ADD_FAIL,
} from "../../../constants";
import { addCategory, getColors } from "./actionsServices";
import * as API from "../../../utils/network";

const mockStore = configureStore([thunk]);

describe("Services action", () => {
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
