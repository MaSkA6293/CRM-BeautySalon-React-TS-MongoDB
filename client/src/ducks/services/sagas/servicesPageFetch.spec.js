import { call, put, delay, all } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { runFetchServicesPage } from "../actionCreators/servicesPageFetch";
import { fetchServicesPage } from "./servicesPageFetch";
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesError } from "../actionCreators/fetchServices";
import { fetchCategoriesSuccess } from "../../categories/actionCreators/fetchCategories";
import { clearMessageServices } from "../actionCreators";
import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";

describe("fetchServicesPageSaga", () => {
    const action = runFetchServicesPage();
    const saga = fetchServicesPage(action);
    let output = null;
    it("should put fetchServicesRequest", () => {
        output = saga.next().value;
        let expected = put(fetchServicesRequest());
        expect(output).toEqual(expected);
    });
    it("should call categories, colors, services", (done) => {
        output = saga.next().value;
        let expected = all([
            call(httpRequest, "api/services/categories", "GET"),
            call(httpRequest, "api/color", "GET"),
            call(httpRequest, "api/services", "GET"),
        ]);
        done();
        expect(output).toEqual(expected);
    });
    it("should put fetchServicesSuccess", () => {
        const services = { data: [] };
        const categories = { data: [] };
        const colors = { data: [] };
        output = saga.next([categories, colors, services]).value;
        let expected = put(fetchCategoriesSuccess(categories));
        expect(output).toEqual(expected);
    });
    it("should put fetchColorsSuccess", () => {
        const colors = { data: [] };
        output = saga.next().value;
        let expected = put(fetchColorsSuccess(colors));
        expect(output).toEqual(expected);
    });
    it("should put fetchServicesSuccess", () => {
        const services = { data: [] };
        output = saga.next().value;
        let expected = put(fetchServicesSuccess(services));
        expect(output).toEqual(expected);
    });

    it("should return done=true", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toEqual(expected);
    });
});

describe("tests Error fetchServicesPageSaga", () => {
    const action = runFetchServicesPage();
    const sagaError = fetchServicesPage(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(fetchServicesError(error));
        expect(output).toEqual(expected);
    });
    it("should delay(4000)", () => {
        output = sagaError.next().value;
        let expected = delay(4000);
        expect(output).toEqual(expected);
    });
    it("should put clearMessageServices", () => {
        output = sagaError.next().value;
        let expected = put(clearMessageServices());
        expect(output).toEqual(expected);
    });
});
