import { ColorsActionsType, ColorsAction } from "./contracts/actionTypes";
import { IstateColors } from "./contracts/state";

const initialState: IstateColors = {
    colorsLoaded: false,
    colorsIsLoading: false,
    colorsList: [],
};

const stateColors = (state: IstateColors = initialState, action: ColorsAction) => {
    switch (action.type) {
        case ColorsActionsType.FETCH_COLORS_REQUEST:
            return {
                ...state,
                colorsIsLoading: true,
                colorsLoaded: false,
                colorsList: [],
            };
        case ColorsActionsType.FETCH_COLORS_SUCCESS:
            return {
                ...state,
                colorsIsLoading: false,
                colorsLoaded: true,
                colorsList: action.payload,
            };
        case ColorsActionsType.FETCH_COLORS_ERROR:
            return {
                ...state,
                colorsIsLoading: false,
            };

        default:
            return state;
    }
};

export default stateColors;
