import { IGlobalStore } from "../../reducers/rootReducer";
import { IColor, IstateColors } from "./contracts/state";

export const selectColorsState = (state: IGlobalStore): IstateColors => state.colors;

export const selectColorsList = (state: IGlobalStore): IColor[] => selectColorsState(state).colorsList;
