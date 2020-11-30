import { IRunFetchservicesPage, ServicesActionsType } from "../contracts/actionTypes";

export const runFetchServicesPage = (): IRunFetchservicesPage => {
    return { type: ServicesActionsType.FETCH_SERVICES_PAGE };
};
