import { ServicesActionsType } from "./actionTypes";
import { IService } from "./state";
export interface IAddServic {
    name: string;
    duration: number[];
    cost: number;
    colorId: string;
    categoriesId: string[];
}
export interface IRunAddNewService {
    type: typeof ServicesActionsType.ADD_NEW_SERVICE;
    payload: {
        data: IAddServic;
        callback: () => void;
    };
}

export interface IAddServicErrorProps {
    response: { data: { message: string } };
}

export interface IRunEditService {
    type: typeof ServicesActionsType.EDIT_SERVICE;
    payload: {
        data: IService;
        callback: () => void;
    };
}
export interface IEditServicErrorProps {
    response: { data: { message: string } };
}

export interface IRunDeletService {
    type: typeof ServicesActionsType.DELET_SERVICE;
    payload: { _id: string; callback: () => void };
}
export interface IDeletServicErrorProps {
    response: { data: { message: string } };
}
