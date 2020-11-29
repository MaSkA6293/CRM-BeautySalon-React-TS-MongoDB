import { editClient } from "./editClient";
import { runEditClient } from "../actionCreators/editClient";
import { editClientRequest, editClientSuccess, editClientFail } from "../actionCreators/editClient";
import { call, delay, put } from "redux-saga/effects";
import { clientsClearMessage } from "../actionCreators";
import { ClientsActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";

describe("test saga editClient", () => {
    const action = runEditClient({}, () => undefined);
    const saga = editClient(action);
    let output = null;
    it("should put editClientRequest", () => {
        output = saga.next().value;
        let expected = put(editClientRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/client/${action.payload.client._id} method PUT", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, `api/client/${action.payload.client._id}`, "PUT", action.payload.client);
        expect(output).toEqual(expected);
    });
    it("test should put editClientSuccess", () => {
        const response = { data: { userData: {}, message: "" } };
        output = saga.next(response).value;
        let expected = put(editClientSuccess(response.data));
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

describe("test editClient Error", () => {
    const action = runEditClient({}, () => undefined);
    const sagaError = editClient(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(editClientFail(error));
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
    it("runEditClient", () => {
        const data = {};
        const callback = () => undefined;
        const actions = runEditClient(data, callback);
        const expectActions = { type: ClientsActionsType.EDIT_CLIENT, payload: { client: data, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("addClientRequest", () => {
        const actions = editClientRequest();
        const expectActions = {
            type: ClientsActionsType.EDIT_CLIENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("addClientSuccess", () => {
        const data = {
            data: {},
            message: "message",
        };
        const actions = editClientSuccess(data);
        const expectActions = {
            type: ClientsActionsType.EDIT_CLIENT_SUCCESS,
            payload: {
                data: data.client,
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
    it("editClientFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = editClientFail(error);
        const expectActions = {
            type: ClientsActionsType.EDIT_CLIENT_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
