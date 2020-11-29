import { deletClient } from "./deletClient";
import { call, delay, put } from "redux-saga/effects";
import { clientsClearMessage } from "../actionCreators";
import { ClientsActionsType } from "../contracts/actionTypes";
import { httpRequest } from "../../../utils/network";

import { runDeletClient, deletClientRequest, deletClientSuccess, deletClientFail } from "../actionCreators/deletClient";

describe("test saga deletClient", () => {
    const action = runDeletClient(1, () => undefined);
    const saga = deletClient(action);
    let output = null;
    it("should put deletClientRequest", () => {
        output = saga.next().value;
        let expected = put(deletClientRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/client/${action.payload._id} method DELETE", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, `api/client/${action.payload._id}`, "DELETE");
        expect(output).toEqual(expected);
    });
    it("test should put deletClientSuccess", () => {
        const response = { data: { _id: 1, message: "" } };
        output = saga.next(response).value;
        let expected = put(deletClientSuccess(response.data));
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
        console.log("delet output", output);
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test deletClient Error", () => {
    const action = runDeletClient(1, () => undefined);
    const sagaError = deletClient(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(deletClientFail(error));
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

describe("test deletClient actions", () => {
    it("runDeletClient", () => {
        const _id = 1;
        const callback = () => undefined;
        const actions = runDeletClient(_id, callback);
        const expectActions = { type: ClientsActionsType.DELET_CLIENT, payload: { _id, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("deletClientRequest", () => {
        const actions = deletClientRequest();
        const expectActions = {
            type: ClientsActionsType.DELET_CLIENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("deletClientSuccess", () => {
        const data = {
            _id: 2,
            message: "message",
        };
        const actions = deletClientSuccess(data);
        const expectActions = {
            type: ClientsActionsType.DELET_CLIENT_SUCCESS,
            payload: {
                _id: data._id,
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
    it("deletClientFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = deletClientFail(error);
        const expectActions = {
            type: ClientsActionsType.CLIENT_DELET_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
