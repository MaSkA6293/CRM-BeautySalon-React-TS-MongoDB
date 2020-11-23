import { IGlobalStore } from '../../reducers/rootReducer'
import { IstateUser } from './contracts/state'
import { UserStatus } from "./contracts/state"
export const selectUserState = (state: IGlobalStore): IstateUser => state.UserReducer;
export const selectStatusUser = (state: IGlobalStore): UserStatus => selectUserState(state).statusUser;
export const selectIsAuth = (state: IGlobalStore): boolean => !!selectUserState(state).userData;
export const selectIsLogining = (state: IGlobalStore): boolean => selectUserState(state).userIsLogining;
export const selectuserIsLoading = (state: IGlobalStore): boolean => selectUserState(state).userIsLoading;

export const selectuserCreateError = (state: IGlobalStore): string => selectUserState(state).userCreateError;
export const selectuserIsLogining = (state: IGlobalStore): boolean => selectUserState(state).userIsLogining;
export const selectuserLoginingError = (state: IGlobalStore): string => selectUserState(state).userLoginingError;
export const selectuserCreateSuccess = (state: IGlobalStore): string => selectUserState(state).userCreateSuccess;