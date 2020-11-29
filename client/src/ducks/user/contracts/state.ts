export interface IstateUser {
    userIsLoading: boolean;
    userMessageSuccess: string;
    userMessageError: string;
    userIsLogining: boolean;
    userData: undefined | User;
    statusUser: UserStatus;
    userCreateSuccess: boolean;
}
export interface User {
    id: string;
}

export enum UserStatus {
    READY = "READY",
    NOT_READY = "NOT_READY",
}
