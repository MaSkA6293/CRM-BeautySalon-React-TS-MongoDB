export interface IstateService {
    readonly servicesIsFetching: boolean;
    readonly servicesList: IService[];
    readonly servicesMessageError: string;
    readonly servicesMessageSuccess: string;

    readonly servicePageRequest: boolean;

    readonly servicesIsLoading: boolean;
    readonly servicesLoaded: boolean;

    readonly servicesGetIsFail: boolean;
    readonly servicesGetError: string;

    readonly serviceIsAdded: boolean;
    readonly serviceAdded: boolean;

    readonly serviceIsEdited: boolean;
    readonly serviceEdited: boolean;

    readonly serviceIsDeleted: boolean;
    readonly serviceDeleted: boolean;
}

export interface IService {
    _id: string;
    name: string;
    duration: number[];
    cost: number;
    colorId: string;
    categoriesId: string[];
}
