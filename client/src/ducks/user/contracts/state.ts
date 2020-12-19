export interface IstateUser {
    userIsLoading: boolean;
    userMessageSuccess: string;
    userMessageError: string;
    userIsLogining: boolean;
    userData: undefined | User;
    statusUser: UserStatus;
}
export interface User {
    id: string;
}

export enum UserStatus {
    READY = "READY",
    NOT_READY = "NOT_READY",
}
