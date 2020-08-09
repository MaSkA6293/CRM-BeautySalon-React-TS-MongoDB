import { CREATE_NEW_SERVICE } from "../constants";
import { IstateService } from "../pages/Services/types";
import { ServiceActionTypes } from "../pages/Services/actions";

const initialState: IstateService = {
  categoryIsAdded: false,
  categoryAddIsFail: false,
  categoryAdded: false,
  categoryAddError: "",
  servicesList: [],
};

const stateServices = (
  state: IstateService = initialState,
  action: ServiceActionTypes
) => {
  switch (action.type) {
    case CREATE_NEW_SERVICE:
      return state;
    default:
      return state;
  }
};

export default stateServices;
