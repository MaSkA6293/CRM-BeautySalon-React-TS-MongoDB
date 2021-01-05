import { ClientsActionsType } from "../contracts/actionTypes";

interface IRunDeletClient {
    type: ClientsActionsType.DELET_CLIENT;
    payload: {
        _id: string;
        callback: () => void;
    };
}
export const runDeletClient = (_id: string, callback: () => void): IRunDeletClient => {
    return {
        type: ClientsActionsType.DELET_CLIENT,
        payload: {
            _id,
            callback,
        },
    };
};
interface IDeletClientRequest {
    type: typeof ClientsActionsType.DELET_CLIENT_REQUEST;
}
export const deletClientRequest = (): IDeletClientRequest => {
    return {
        type: ClientsActionsType.DELET_CLIENT_REQUEST,
    };
};

interface IDeletClientSuccess {
    type: ClientsActionsType.DELET_CLIENT_SUCCESS;
    payload: {
        _id: number;
        message: string;
    };
}
export const deletClientSuccess = (response: { _id: number; message: string }): IDeletClientSuccess => {
    return {
        type: ClientsActionsType.DELET_CLIENT_SUCCESS,
        payload: {
            _id: response._id,
            message: response.message,
        },
    };
};

interface IdeletClientFail {
    type: ClientsActionsType.CLIENT_DELET_FAIL;
    payload: {
        message: string;
    };
}
interface IAddClientFailProps {
    response: { data: { message: string } };
}

export const deletClientFail = (e: IAddClientFailProps): IdeletClientFail => {
    return {
        type: ClientsActionsType.CLIENT_DELET_FAIL,
        payload: {
            message: e.response.data.message ? e.response.data.message : "Что-то пошло не так, попробуйте снова",
        },
    };
};
