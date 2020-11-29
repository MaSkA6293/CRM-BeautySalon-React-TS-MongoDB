import { IGlobalStore } from "../../reducers/rootReducer";
import { IClient, IstateClients } from "./contracts/state";
export const selectClientsState = (state: IGlobalStore): IstateClients => state.clients;

export const selectClientMessageSuccess = (state: IGlobalStore): string =>
    selectClientsState(state).clientMessageSuccess;
export const selectClientMessageError = (state: IGlobalStore): string => selectClientsState(state).clientMessageError;
export const selectClientsList = (state: IGlobalStore): IClient[] => selectClientsState(state).clientsList;
export const selectClientsIsLoading = (state: IGlobalStore): boolean => selectClientsState(state).clientsIsLoading;

export const selectClientIsDeleting = (state: IGlobalStore): boolean => selectClientsState(state).clientIsDeleting;
export const selectClientIsEditing = (state: IGlobalStore): boolean => selectClientsState(state).clientIsEditing;
export const selectClientIsAdding = (state: IGlobalStore): boolean => selectClientsState(state).clientIsAdding;
