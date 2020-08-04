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

// Store
// export interface IClient {
//   id: number;
//   name: string;
//   female: string;
//   phone: string;
// }
export interface IRecord {
  id: number;
  clientId: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  color: number;
}

type serviceList = {
  id: number;
  name: string;
  price: number;
};

export interface IService {
  id: number;
  name: string;
  list: serviceList[];
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

export interface IstateService {
  servicesList: IService[];
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

interface IAddServiceAction {
  type: typeof CREATE_NEW_SERVICE;
  payload: {
    id: number;
    clientId: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    color: number;
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

export type ServiceActionTypes = IAddServiceAction;
