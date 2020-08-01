import { IstateColors } from "../types";

const initialState: IstateColors = {
  colors: [
    {
      id: 1,
      hex: "rgb(0, 171, 214)",
    },
    {
      id: 2,
      hex: "rgb(255, 173, 20)",
    },
    {
      id: 3,
      hex: "rgba(255, 39, 93)",
    },
    {
      id: 4,
      hex: "rgba(60, 95, 226)",
    },
    {
      id: 5,
      hex: "rgb(0, 255, 37)",
    },
    {
      id: 6,
      hex: "rgba(195, 85, 245)",
    },
    {
      id: 7,
      hex: "rgba(255, 100, 100)",
    },
  ],
};

const stateColors = (state: IstateColors = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default stateColors;
