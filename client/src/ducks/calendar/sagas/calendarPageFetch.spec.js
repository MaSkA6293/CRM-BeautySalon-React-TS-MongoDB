import { CalendarActionsType } from "../contracts/actionTypes";
import { calendarClearMessage } from "../actionCreators";
import { runCalendarPageFetch } from "../actionCreators/fetchCalendarPage";
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsError } from "../actionCreators/fetchEvents";

import { fetchColorsSuccess } from "../../colors/actionCreators/fetchColors";
import { fetchCalendarPage } from "./calendarPageFetch";
import { call, delay, put, all } from "redux-saga/effects";
import { httpRequest } from "../../../utils/network";

describe("test saga fetchCalendarPage", () => {
    const action = runCalendarPageFetch();
    const saga = fetchCalendarPage(action);
    let output = null;
    it("should put fetchEventsRequest", () => {
        output = saga.next().value;
        let expected = put(fetchEventsRequest());
        expect(output).toEqual(expected);
    });
    it("should call events,colors parallel", (done) => {
        output = saga.next().value;
        let expected = all([call(httpRequest, "api/calendar/events", "GET"), call(httpRequest, "api/color", "GET")]);
        done();
        expect(output).toEqual(expected);
    });
    it("should put fetchEventsSuccess", () => {
        const events = { data: [] };
        const colors = { data: [] };
        output = saga.next([events, colors]).value;
        let expected = put(fetchEventsSuccess(events));
        expect(output).toEqual(expected);
    });
    it("should put fetchColorsSuccess", () => {
        const colors = { data: [] };
        output = saga.next().value;
        let expected = put(fetchColorsSuccess(colors));
        expect(output).toEqual(expected);
    });

    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test fetchCalendarPage Error", () => {
    const action = runCalendarPageFetch();
    const sagaError = fetchCalendarPage(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } },
        };
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(fetchEventsError(error));
        expect(output).toEqual(expected);
    });
    it("should delay 4000", () => {
        output = sagaError.next().value;
        let expected = delay(4000);
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

describe("test fetchCalendarPage actions", () => {
    it("runCategoriesPageFetch", () => {
        const actions = runCalendarPageFetch();
        const expectActions = { type: CalendarActionsType.FETCH_CALENDAR_PAGE };
        expect(actions).toEqual(expectActions);
    });
    it("fetchEventsRequest", () => {
        const actions = fetchEventsRequest();
        const expectActions = {
            type: CalendarActionsType.FETCH_EVENTS_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });

    it("fetchEventsError", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = fetchEventsError(error);
        const expectActions = {
            type: CalendarActionsType.FETCH_EVENTS_ERROR,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : "Что-то пошло не так, попробуйте снова",
            },
        };
        expect(actions).toEqual(expectActions);
    });
});
