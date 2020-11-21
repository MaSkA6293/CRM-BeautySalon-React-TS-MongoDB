export interface IstateUser {
    userLoaded: boolean;
    userIsLoading: boolean;
    userGetIsFail: boolean;
    userGetError: string;
    userIsLogining: boolean;
    userIsLogined: boolean;
    userLoginIsFail: boolean;
    userLoginError: string;
    userData: { token: string; id: string };
    userReady: boolean;
    userCreateSuccess: string;
}

