import { runSignOut, userSignOut } from "../actionCreators/signOut";
import { signOut } from "./signOut";

import { UserActionsType } from "../contracts/actionTypes";
import { put } from "redux-saga/effects";

describe("test saga signUp", () => {
    const action = runSignOut();
    const saga = signOut(action);
    let output = null;
    it("should put userSignOut", () => {
        output = saga.next().value;
        let expected = put(userSignOut());
        expect(output).toEqual(expected);
    });
    it("should end", () => {
        output = saga.next().done;
        let expected = true;
        expect(output).toBe(expected);
    });
});

describe("test signOut actions", () => {
    it("runSignOut", () => {
        const actions = runSignOut();
        const expectActions = {
            type: UserActionsType.USER_SIGN_OUT,
        };
        expect(actions).toEqual(expectActions);
    });
    it("userSignOut", () => {
        const actions = userSignOut();
        const expectActions = {
            type: UserActionsType.SIGN_OUT,
        };
        expect(actions).toEqual(expectActions);
    });
});
