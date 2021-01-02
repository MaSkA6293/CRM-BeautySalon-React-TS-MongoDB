import { CalendarActionsType } from "../contracts/actionTypes";
import { calendarClearMessage } from "../actionCreators";
import { deletEventRequest, deletEventSuccess, deletEventError, runDeletEvent } from "../actionCreators/deletEvent";
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";
import { deletEvent } from "./deletEvent";

describe("test saga deletEvent", () => {
    const action = runDeletEvent({ _id: "1" }, () => undefined);
    const saga = deletEvent(action);
    let output = null;
    it("should put deletEventRequest", () => {
        output = saga.next().value;
        let expected = put(deletEventRequest());
        expect(output).toEqual(expected);
    });
    it("should call `api/calendar/events/${action.payload._id}`, DELETE", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, `api/calendar/events/${action.payload._id}`, "DELETE");
        expect(output).toEqual(expected);
    });
    it("test should put deletEventSuccess", () => {
        const response = { data: { _id: "1", message: "" } };
        output = saga.next(response).value;
        let expected = put(deletEventSuccess(response.data));
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
    it("should put clearSuccess message ", () => {
        output = saga.next().value;
        let expected = put(calendarClearMessage());
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test deletEventError", () => {
    const action = runDeletEvent({ _id: "1" }, () => undefined);
    const sagaError = deletEvent(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(deletEventError(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should put clear message ", () => {
        output = sagaError.next().value;
        let expected = put(calendarClearMessage());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test deletEvent actions", () => {
    it("runDeletEvent", () => {
        const _id = "1";
        const callback = () => undefined;
        const actions = runDeletEvent(_id, callback);
        const expectActions = { type: CalendarActionsType.DELET_EVENT, payload: { _id, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("deletEventRequest", () => {
        const actions = deletEventRequest();
        const expectActions = {
            type: CalendarActionsType.DELET_EVENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("deletEventSuccess", () => {
        const data = { _id: "id", message: "message" };
        const actions = deletEventSuccess(data);
        const expectActions = {
            type: CalendarActionsType.DELET_EVENT_SUCCESS,
            payload: { _id: data._id, message: data.message },
        };
        expect(actions).toEqual(expectActions);
    });

    it("deletEventError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = deletEventError(error);
        const expectActions = {
            type: CalendarActionsType.DELET_EVENT_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
