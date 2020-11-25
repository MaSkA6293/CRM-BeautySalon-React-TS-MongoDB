export interface IstateUser {
    userIsLoading: boolean;
    userCreateError: string;
    userIsLogining: boolean;
    userLoginingError: string;
    userData: undefined | User;
    userCreateSuccess: string;
    statusUser: UserStatus;
}
export interface User {
    id: string;
}

export enum UserStatus {
    READY = "READY",
    NOT_READY = "NOT_READY",
}
