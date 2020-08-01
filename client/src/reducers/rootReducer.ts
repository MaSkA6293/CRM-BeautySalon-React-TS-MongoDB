import { combineReducers } from "redux";
import {
  IstateRecords,
  IstateApp,
  IstateColors,
  IstateService,
} from "../types";
import { IstateClients } from "../types/typesClients";
import app from "./app";
import clients from "./clients";
import records from "./records";
import colors from "./colors";
import services from "./services";

export interface IGlobalStore {
  app: IstateApp;
  clients: IstateClients;
  records: IstateRecords;
  colors: IstateColors;
  services: IstateService;
}

const rootReducer = combineReducers<IGlobalStore>({
  app,
  clients,
  records,
  colors,
  services,
});
export default rootReducer;
