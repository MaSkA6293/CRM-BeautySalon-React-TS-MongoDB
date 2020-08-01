import { CHANGE_DATE, NEXT_DATE, PREV_DATE } from "../constants";
import { AppActionTypes, IstateApp } from "../types";

const initialState: IstateApp = {
  date: new Date(),
  workTime: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ],
};

const stateApp = (state: IstateApp = initialState, action: AppActionTypes) => {
  switch (action.type) {
    case CHANGE_DATE:
      return { ...state, date: action.payload.date };
    case NEXT_DATE:
      return { ...state, date: action.payload.date };
    case PREV_DATE:
      return { ...state, date: action.payload.date };
    default:
      return state;
  }
};

export default stateApp;
