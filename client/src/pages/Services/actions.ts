import { CREATE_NEW_SERVICE } from "../../constants";
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

export type ServiceActionTypes = IAddServiceAction;
