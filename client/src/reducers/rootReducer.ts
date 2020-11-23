import { combineReducers } from "redux";
import { IstateRecords, IstateApp } from "../types";
import { IstateService } from "../pages/Services/types";
import { IstateClients } from "../types/typesClients";
import { IstateColors } from "../types/typesColors";
import { IstateUser } from "../ducks/user/contracts/state";
import app from "./app";
import clients from "./clients";
import records from "./records";
import colors from "./colors";
import services from "./services";
import UserReducer from "../ducks/user/reducer";

export interface IGlobalStore {
  app: IstateApp;
  clients: IstateClients;
  records: IstateRecords;
  colors: IstateColors;
  services: IstateService;
  UserReducer: IstateUser;
}

const rootReducer = combineReducers<IGlobalStore>({
  app,
  clients,
  records,
  colors,
  services,
  UserReducer,
});
export default rootReducer;
