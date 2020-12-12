import { ColorsActionsType } from "../contracts/actionTypes";
import {
    runFetchColors,
    fetchColorsRequest,
    fetchColorsSuccess,
    fetchColorsError,
} from "../actionCreators/fetchColors";
import { fetchColors } from "./fetchColors";

import { call, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga fetchColors", () => {
    const action = runFetchColors();
    const saga = fetchColors(action);
    let output = null;
    it("should put fetchColorsRequest", () => {
        output = saga.next().value;
        let expected = put(fetchColorsRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/Colors, GET", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/Colors", "GET");
        expect(output).toEqual(expected);
    });
    it("test should put fetchColorsSuccess", () => {
        const colors = { data: [] };
        output = saga.next(colors).value;
        let expected = put(fetchColorsSuccess(colors));
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test fetchColors Error", () => {
    const action = runFetchColors();
    const sagaError = fetchColors(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(fetchColorsError(error));
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test fetchColors actions", () => {
    it("runFetchColors", () => {
        const actions = runFetchColors();
        const expectActions = { type: ColorsActionsType.FETCH_COLORS };
        expect(actions).toEqual(expectActions);
    });
    it("fetchColorsRequest", () => {
        const actions = fetchColorsRequest();
        const expectActions = {
            type: ColorsActionsType.FETCH_COLORS_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("fetchColorsSuccess", () => {
        const response = { data: [] };
        const actions = fetchColorsSuccess(response);
        const expectActions = {
            type: ColorsActionsType.FETCH_COLORS_SUCCESS,
            payload: response.data,
        };
        expect(actions).toEqual(expectActions);
    });

    it("fetchColorsError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = fetchColorsError(error);
        const expectActions = {
            type: ColorsActionsType.FETCH_COLORS_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
