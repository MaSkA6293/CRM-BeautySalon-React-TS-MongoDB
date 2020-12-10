export interface IstateCategories {
    readonly categoryIsAdding: boolean;
    readonly categoryIsEditing: boolean;
    readonly categoryIsDeleting: boolean;
    readonly categoryesIsFetching: boolean;
    readonly categoryesList: ICategory[];
    readonly categoryesMessageError: string;
    readonly categoryesMessageSuccess: string;
}

export interface ICategoryValues {
    name: string;
    comment: string;
    color: string;
}

export interface ICategory {
    _id: string;
    name: string;
    colorId: string;
}
