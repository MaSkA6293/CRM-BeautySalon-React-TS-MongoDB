import { combineReducers } from "redux";
import { IstateRecords, IstateApp, IstateColors } from "../types";
import { IstateService } from "../pages/Services/types";
import { IstateClients } from "../types/typesClients";
import { IstateUser } from "../pages/AuthPage/types";
import app from "./app";
import clients from "./clients";
import records from "./records";
import colors from "./colors";
import services from "./services";
import user from "./user";

export interface IGlobalStore {
  app: IstateApp;
  clients: IstateClients;
  records: IstateRecords;
  colors: IstateColors;
  services: IstateService;
  user: IstateUser;
}

const rootReducer = combineReducers<IGlobalStore>({
  app,
  clients,
  records,
  colors,
  services,
  user,
});
export default rootReducer;
