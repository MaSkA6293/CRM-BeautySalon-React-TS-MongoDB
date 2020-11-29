import { addClient } from "./addClient";
import { runAddClient } from "../actionCreators/addClient";
import { addClientRequest, addClientSuccess, addClientFail } from "../actionCreators/addClient";
import { call, delay, put } from "redux-saga/effects";
import { clientsClearMessage } from "../actionCreators";
import { ClientsActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";

describe("test saga addClient", () => {
    const action = runAddClient({}, () => undefined);
    const saga = addClient(action);
    let output = null;
    it("should put addClientRequest", () => {
        output = saga.next().value;
        let expected = put(addClientRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/client method POST", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/client", "POST", action.payload.client);
        expect(output).toEqual(expected);
    });
    it("test should put addClientSuccess", () => {
        const response = { data: { client: {}, message: "" } };
        output = saga.next(response).value;
        let expected = put(addClientSuccess(response.data));
        expect(output).toEqual(expected);
    });
    it("should call callback", () => {
        output = saga.next().value;
        let expected = call(action.payload.callback);
        expect(output).toEqual(expected);
    });
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000);
        expect(output).toEqual(expected);
    });
    it("should put clientsClearMessage ", () => {
        output = saga.next().value;
        let expected = put(clientsClearMessage());
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test addClient Error", () => {
    const action = runAddClient();
    const sagaError = addClient(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addClientFail(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(clientsClearMessage());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test addClient actions", () => {
    it("runAddClient", () => {
        const data = {};
        const callback = () => undefined;
        const actions = runAddClient(data, callback);
        const expectActions = { type: ClientsActionsType.ADD_CLIENT, payload: { client: data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("addClientRequest", () => {
        const actions = addClientRequest();
        const expectActions = {
            type: ClientsActionsType.ADD_CLIENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("addClientSuccess", () => {
        const data = {
            client: {},
            message: "message",
        };
        const actions = addClientSuccess(data);
        const expectActions = {
            type: ClientsActionsType.ADD_CLIENT_SUCCESS,
            payload: {
                client: data.client,
                message: data.message,
            },
        };
        expect(actions).toEqual(expectActions);
    });
    it("clientsClearMessage", () => {
        const actions = clientsClearMessage();
        const expectActions = { type: ClientsActionsType.CLEAR_MESSAGE_CLIENT };
        expect(actions).toEqual(expectActions);
    });
    it("addClientFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = addClientFail(error);
        const expectActions = {
            type: ClientsActionsType.CLIENT_ADD_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
