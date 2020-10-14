import {
  fetchServicePageData,
  servicPageRequest,
  colorsRequestSuccess,
  servicesAndCategoriesSuccess,
  requestError,
  clearErrorRequest
} from "./fetchServicePageData";
import { call, put, all, delay } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";
import {
  COLORS_REQUEST_SUCCESS,
  GET_SERVICES_AND_CATEGORIES_REQUEST_SUCCESS,
  GET_SERVICES_AND_CATEGORIES_REQUEST_ERROR,
  SERVICE_PAGE_REQUEST,
  CLEAR_ERROR_REQUEST_FAIL
} from "../../constants";

describe("FetchClients Saga", () => {
  const saga = fetchServicePageData();
  let output = null;
  it("should call colors,services,categories parallel", (done) => {
    output = saga.next().value;
    let expected = all([call(httpRequest, "api/services/categories", "GET"),
    call(httpRequest, "api/color", "GET"),
    call(httpRequest, "api/services", "GET")]);
    done();
    expect(output).toEqual(expected);
  });
  it("should put colors request success", () => {
    const colors = { data: [] };
    const categories = { data: [] };
    const services = { data: [] };
    output = saga.next([colors, categories, services]).value;
    let expected = put(colorsRequestSuccess(colors))
    expect(output).toEqual(expected);
  });
  it("should put services and categories request success", () => {
    const categories = { data: [] };
    const services = { data: [] };
    output = saga.next().value;
    let expected = put(servicesAndCategoriesSuccess(services, categories))
    expect(output).toEqual(expected);
  });
  it("should return done=true", () => {
    output = saga.next().done;
    let expected = true
    expect(output).toEqual(expected);
  });

});

describe("tests Error FetchClients saga", () => {
  const sagaError = fetchServicePageData();
  let output = null;
  it("should break", () => {
    sagaError.next().value;
    output = sagaError.throw().value
    let expected = put(requestError())
    expect(output).toEqual(expected);
  });
  it("should delay(4000)", () => {
    output = sagaError.next().value;
    let expected = delay(4000)
    expect(output).toEqual(expected)
  });
  it("should put clear error after delay", () => {
    output = sagaError.next().value;
    let expected = put(clearErrorRequest());
    expect(output).toEqual(expected)
  })
})

describe('tests action fetchServicePageData', () => {
  it("test servicPageRequest", () => {
    const output = servicPageRequest();
    const expected = { type: SERVICE_PAGE_REQUEST }
    expect(output).toEqual(expected)
  })
  it("test colorsRequestSuccess", () => {
    const colors = { data: [] };
    const output = colorsRequestSuccess(colors);
    const expected = {
      type: COLORS_REQUEST_SUCCESS,
      payload: colors.data,
    }
    expect(output).toEqual(expected)
  })
  it("test servicesAndCategoriesSuccess", () => {
    const categories = { data: [] };
    const services = { data: [] };
    const output = servicesAndCategoriesSuccess(services, categories);
    const expected = {
      type: GET_SERVICES_AND_CATEGORIES_REQUEST_SUCCESS,
      payload: { services: services.data, categories: categories.data }
    }
    expect(output).toEqual(expected)
  })
  it("test requestError", () => {
    const output = requestError();
    const expected = {
      type: GET_SERVICES_AND_CATEGORIES_REQUEST_ERROR,
      payload: { message: "Ошибка получения данных с сервера" }
    }
    expect(output).toEqual(expected)
  })
  it("test clearErrorRequest", () => {
    const output = clearErrorRequest();
    const expected = { type: CLEAR_ERROR_REQUEST_FAIL }
    expect(output).toEqual(expected)
  })
})
