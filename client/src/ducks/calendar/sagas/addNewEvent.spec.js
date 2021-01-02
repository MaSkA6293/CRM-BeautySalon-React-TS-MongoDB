import { CalendarActionsType } from "../contracts/actionTypes";
import { calendarClearMessage } from "../actionCreators";
import { runAddNewEvent, addEventRequest, addEventSuccess, addEventError } from "../actionCreators/addNewEvent";
import { addEvent } from "./addNewEvent";

import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga addEvent", () => {
    const action = runAddNewEvent({}, () => undefined);
    const saga = addEvent(action);
    let output = null;
    it("should put addEventRequest", () => {
        output = saga.next().value;
        let expected = put(addEventRequest());
        expect(output).toEqual(expected);
    });
    it("should call api/calendar/events, POST", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/calendar/events", "POST", action.payload.event);
        expect(output).toEqual(expected);
    });
    it("test should put addEventSuccess", () => {
        const response = { data: { data: {} }, message: "" };
        output = saga.next(response).value;
        let expected = put(addEventSuccess(response.data));
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
    it("should put clear message ", () => {
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

describe("test addEvent Error", () => {
    const action = runAddNewEvent({}, () => undefined);
    const sagaError = addEvent(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addEventError(error));
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

describe("test addEvent actions", () => {
    it("runAddNewEvent", () => {
        const event = {};
        const callback = () => undefined;
        const actions = runAddNewEvent(event, callback);
        const expectActions = { type: CalendarActionsType.ADD_NEW_EVENT, payload: { event, callback } };
        expect(actions).toEqual(expectActions);
    });
    it("addCategoryRequest", () => {
        const actions = addEventRequest();
        const expectActions = {
            type: CalendarActionsType.ADD_EVENT_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });
    it("addEventSuccess", () => {
        const response = { event: {}, message: "" };
        const actions = addEventSuccess(response);
        const expectActions = {
            type: CalendarActionsType.ADD_EVENT_SUCCESS,
            payload: {
                event: response.event,
                message: response.message,
            },
        };
        expect(actions).toEqual(expectActions);
    });
    describe("addEventError", () => {
        it("error  message=true", () => {
            const error = { response: { data: { message: "some error" } } };
            const actions = addEventError(error);
            const expectActions = {
                type: CalendarActionsType.EVENT_ADD_ERROR,
                payload: {
                    message: error.response.data.message
                        ? error.response.data.message
                        : "Что-то пошло не так, попробуйте снова",
                },
            };
            expect(actions).toEqual(expectActions);
        });
        it("error  message=false", () => {
            const error = { response: { data: { errors: ["some error", "some validation err"] } } };
            const actions = addEventError(error);
            const expectActions = {
                type: CalendarActionsType.EVENT_ADD_ERROR,
                payload: {
                    message: error.response.data.errors.map((el) => `${el.msg}`).join(" "),
                },
            };
            expect(actions).toEqual(expectActions);
        });
    });
});
