import {
    addService,
    runAddService,
    addServiceRequest,
    addServiceSuccess,
    clearAddServiceSuccess,
    addServiceFail,
    clearAddServiceError
} from './addService';
import {
    ADD_SERVIC,
    ADD_SERVIC_REQUEST,
    ADD_SERVIC_SUCCESS,
    CLEAR_MESSAGE_SERVIC_ADD_SUCCESS,
    ADD_SERVIC_FAIL,
    CLEAR_MESSAGE_SERVIC_ADD_FAIL
} from '../../constants'
import { call, delay, put } from "redux-saga/effects";
import { httpRequest } from "../../utils/network";

describe("test saga addService", () => {
    const action = { payload: { data: { email: "", password: '' }, callback: () => { } } };
    const saga = addService(action);
    let output = null;
    it("should put addServiceRequest", () => {
        output = saga.next().value;
        let expected = put(addServiceRequest());
        expect(output).toEqual(expected)
    });
    it("should call api/services", (done) => {
        output = saga.next().value;
        done();
        let expected = call(httpRequest, "api/services", "POST", action.payload.data);
        expect(output).toEqual(expected)
    })
    it('test should put addServiceSuccess', () => {
        const response = { data: [] }
        output = saga.next(response).value
        let expected = put(addServiceSuccess(response.data))
        expect(output).toEqual(expected)
    })
    it("should delay 3000", () => {
        output = saga.next().value;
        let expected = delay(3000)
        expect(output).toEqual(expected)
    })
    it('should put clearSuccess message ', () => {
        output = saga.next().value;
        let expected = put(clearAddServiceSuccess())
        expect(output).toEqual(expected)
    })
    it("should call callback", () => {
        output = saga.next().value;
        let expected = call(action.payload.callback);
        expect(output).toEqual(expected)
    })
    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected)
    })
})


describe("test addService Error", () => {
    const action = { payload: { data: { _id: "1" }, callback: () => { } } };
    const sagaError = addService(action);
    let output = null;
    it("test error", () => {
        const error = {
            response: { data: { message: "error" } }
        };
        sagaError.next();
        sagaError.next();
        output = sagaError.throw(error).value;
        let expected = put(addServiceFail(error));
        expect(output).toEqual(expected);
    })
    it("should delay 2000", () => {
        output = sagaError.next().value;
        let expected = delay(2000)
        expect(output).toEqual(expected)
    })
    it("should clear error", () => {
        output = sagaError.next().value;
        let expected = put(clearAddServiceError());
        expect(output).toEqual(expected);
    })
    it("should end", () => {
        output = sagaError.next().done;
        let expected = true;
        expect(output).toBe(expected)
    })
})



describe("test deletService actions", () => {

    it("runAddService", () => {
        const data = {
            name: 'string',
            duration: [],
            cost: 1,
            colorId: "string",
            categoriesId: []
        };
        const callback = () => { }
        const actions = runAddService(data, callback);
        const expectActions = { type: ADD_SERVIC, payload: { data, callback } };
        expect(actions).toEqual(expectActions);
    });

    it("addServiceRequest", () => {
        const actions = addServiceRequest();
        const expectActions = {
            type: ADD_SERVIC_REQUEST,
        };
        expect(actions).toEqual(expectActions);
    });


    it("addServiceSuccess", () => {
        const data = { data: { _id: 'id' }, message: 'message' }
        const actions = addServiceSuccess(data);
        const expectActions = {
            type: ADD_SERVIC_SUCCESS,
            payload: { data: data.data, message: data.message },
        };
        expect(actions).toEqual(expectActions);
    });



    it("clearAddServiceSuccess", () => {
        const actions = clearAddServiceSuccess();
        const expectActions = { type: CLEAR_MESSAGE_SERVIC_ADD_SUCCESS };
        expect(actions).toEqual(expectActions);
    });

    it("addServiceFail", () => {
        const error = { response: { data: { message: "some error" } } };
        const actions = addServiceFail(error);
        const expectActions = {
            type: ADD_SERVIC_FAIL,
            payload: {
                message: error.response.data.message
                    ? error.response.data.message
                    : '"Что-то пошло не так, попробуйте снова"',
            },
        };
        expect(actions).toEqual(expectActions);
    });

    it("clearAddServiceError", () => {
        const actions = clearAddServiceError();
        const expectActions = { type: CLEAR_MESSAGE_SERVIC_ADD_FAIL };
        expect(actions).toEqual(expectActions);
    });


})