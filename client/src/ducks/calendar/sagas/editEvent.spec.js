import { CalendarActionsType } from "../contracts/actionTypes";
import { calendarClearMessage } from "../actionCreators";
import { runEditEvent, editEventRequest, editEventSuccess, editEventError } from "../actionCreators/editEvent";
import { editEvent } from "./editEvent";

import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga editEvent", () => {
    const action = runEditEvent({}, () => undefined);
    const saga = editEvent(action);
    let output = null;
    it("should put editEventRequest", () => {
        output = saga.next().value;
        let expected = put(editEventRequest());
        expect(output).toEqual(expected);
    });
    it("should call  `api/calendar/events/${action.payload.event._id}`, PUT", (done) => {
        output = saga.next().value;
        done();
        let expected = call(
            httpRequest,
            `api/calendar/events/${action.payload.event._id}`,
            "PUT",
            action.payload.event,
        );
        expect(output).toEqual(expected);
    });
    it("test should put editEventSuccess", () => {
        const response = { data: { data: {}, message: "" } };
        output = saga.next(response).value;
        let expected = put(editEventSuccess(response.data));
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
    it("should put calendarClearMessage ", () => {
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

describe("test editEvent Error", () => {
    const action = runEditEvent({}, () => undefined);
    const sagaError = editEvent(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(editEventError(error));
        expect(output).toEqual(expected);
    });
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000);
        expect(output).toEqual(expected);
    });
    it("should put clearSuccess message ", () => {
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

describe("test editEvent actions", () => {
    it("runEditEvent", () => {
        const event = {};
        const callback = () => undefined;
        const actions = runEditEvent(event, callback);
        const expectActions = { type: CalendarActionsType.EDIT_EVENT, payload: { event, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("editEventRequest", () => {
        const actions = editEventRequest();
        const expectActions = {
            type: CalendarActionsType.EDIT_EVENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("editEventSuccess", () => {
        const response = { data: { event: {}, message: "" } };
        const actions = editEventSuccess(response);
        const expectActions = {
            type: CalendarActionsType.EDIT_EVENT_SUCCESS,
            payload: {
                event: response.event,
                message: response.message,
            },
        };
        expect(actions).toEqual(expectActions);
    });

    it("editEventError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = editEventError(error);
        const expectActions = {
            type: CalendarActionsType.EDIT_EVENT_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
