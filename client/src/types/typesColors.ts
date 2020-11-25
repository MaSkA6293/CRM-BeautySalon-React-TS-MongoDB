export interface IColor {
    _id: string;
    hex: string;
}

export interface IstateColors {
    readonly colorsLoaded: boolean;
    readonly colorsIsLoading: boolean;
    readonly colorsGetIsFail: boolean;
    readonly colorsGetError: "";
    readonly colorsList: IColor[];
}
