export interface IColor {
  _id: number;
  id: number;
  hex: string;
}

export interface IstateColors {
  readonly colorsLoaded: boolean;
  readonly colorsIsLoading: boolean;
  readonly colorsGetIsFail: boolean;
  readonly colorsGetError: "";
  readonly colorsList: IColor[];
}
