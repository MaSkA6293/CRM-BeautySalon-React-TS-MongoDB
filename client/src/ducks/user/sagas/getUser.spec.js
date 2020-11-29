import { getUser } from "./getUser";
import { getUserSuccess, runGetUser } from "../actionCreators/getUser";
import { UserActionsType } from "../contracts/actionTypes";
import { call, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga getUser", () => {
    const saga = getUser();
    let output = null;
    it("should call api/auth/getUser method GET", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/auth/getUser", "GET");
        expect(output).toEqual(expected);
    });
    it("test should put getUserSuccess", () => {
        const response = { data: {} };
        output = saga.next(response).value;
        let expected = put(getUserSuccess(response.data));
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test getUser actions", () => {
    it("runGetUser", () => {
        const actions = runGetUser();
        const expectActions = {
            type: UserActionsType.GET_USER,
        };
        expect(actions).toEqual(expectActions);
    });

    it("getUserSuccess", () => {
        const data = { data: {} };
        const actions = getUserSuccess(data);
        const expectActions = {
            type: UserActionsType.GET_USER_SUCCESS,
            payload: data,
        };
        expect(actions).toEqual(expectActions);
    });
});
