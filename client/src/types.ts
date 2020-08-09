import {
  CHANGE_DATE,
  NEXT_DATE,
  PREV_DATE,
  ADD_NEW_RECORD,
  CREATE_NEW_RECORD,
  EDIT_RECORD,
  DELET_RECORD,
  CREATE_NEW_SERVICE,
} from "./constants";

export interface IstateRecords {
  records: IRecord[];
}

export interface IRecord {
  id: number;
  clientId: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  color: number;
}

export interface IColor {
  id: number;
  hex: string;
}
export interface IstateApp {
  date: Date;
  workTime: string[];
}

export interface IstateColors {
  colors: IColor[];
}

// Actions

interface IChangeDataAction {
  type: typeof CHANGE_DATE;
  payload: { date: Date };
}

interface INextDataAction {
  type: typeof NEXT_DATE;
  payload: { date: Date };
}

interface IPrevDataAction {
  type: typeof PREV_DATE;
  payload: { date: Date };
}

interface IAddNewClientdAction {
  type: typeof ADD_NEW_RECORD;
  payload: {
    client: {
      id: number;
      name: string;
      famale: string;
      phone: string;
    };
  };
}
interface IAddRecordAction {
  type: typeof CREATE_NEW_RECORD;
  payload: {
    id: number;
    clientId: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    color: number;
  };
}
interface IEditRecordAction {
  type: typeof EDIT_RECORD;
  payload: {
    id: number;
    clientId: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    color: number;
  };
}

interface IDeletRecordAction {
  type: typeof DELET_RECORD;
  payload: {
    id: number;
  };
}

export type RecordActionTypes =
  | IAddRecordAction
  | IEditRecordAction
  | IDeletRecordAction;

export type AppActionTypes =
  | IChangeDataAction
  | IPrevDataAction
  | INextDataAction;
