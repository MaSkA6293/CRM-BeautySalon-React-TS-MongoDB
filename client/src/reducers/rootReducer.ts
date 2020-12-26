import { combineReducers } from "redux";
import { IstateRecords, IstateApp } from "../types";
import { IstateService } from "../ducks/services/contracts/state";
import { IstateClients } from "../ducks/clients/contracts/state";
import { IstateColors } from "../ducks/colors/contracts/state";
import { IstateUser } from "../ducks/user/contracts/state";
import { IstateCategories } from "../ducks/categories/contracts/state";
import { IstateCalendar } from "../ducks/calendar/contracts/state";
import app from "./app";
import clients from "../ducks/clients/reducer";
import records from "./records";
import colors from "../ducks/colors/reducer";
import services from "../ducks/services/reducer";
import UserReducer from "../ducks/user/reducer";
import categories from "../ducks/categories/reducer";
import calendar from "../ducks/calendar/reducer";
export interface IGlobalStore {
    app: IstateApp;
    clients: IstateClients;
    records: IstateRecords;
    colors: IstateColors;
    services: IstateService;
    UserReducer: IstateUser;
    categories: IstateCategories;
    calendar: IstateCalendar;
}

const rootReducer = combineReducers<IGlobalStore>({
    app,
    clients,
    records,
    colors,
    services,
    UserReducer,
    categories,
    calendar,
});
export default rootReducer;
