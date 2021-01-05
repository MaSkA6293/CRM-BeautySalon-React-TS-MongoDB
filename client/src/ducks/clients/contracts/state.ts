export interface IstateClients {
    readonly clientsIsLoading: boolean;
    readonly clientsLoaded: boolean;

    readonly clientsList: IClient[];

    readonly clientIsAdding: boolean;
    readonly clientAdded: boolean;

    readonly clientDeleted: boolean;
    readonly clientIsDeleting: boolean;

    readonly clientEdited: boolean;
    readonly clientIsEditing: boolean;

    readonly clientMessageSuccess: string;
    readonly clientMessageError: string;
}

export interface IClient {
    _id: string;
    name: string;
    surname: string;
    phone: string;
    color: string;
}
export interface IClientValues {
    name: string;
    surname: string;
    phone: string;
}
