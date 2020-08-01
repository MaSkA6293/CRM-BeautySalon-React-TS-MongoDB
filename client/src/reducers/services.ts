import { CREATE_NEW_SERVICE } from "../constants";
import { ServiceActionTypes, IstateService } from "../types";

const initialState: IstateService = {
  services: [
    {
      id: 1,
      name: "Стрижки",
      list: [
        {
          id: 1,
          name: "Женская стрижка (длина волос до 20 см)",
          price: 500,
        },
        {
          id: 2,
          name: "Женская стрижка (длина волос от 20 см до 30 см)",
          price: 550,
        },
      ],
    },
    {
      id: 2,
      name: "Окрашивание",
      list: [
        {
          id: 1,
          name: "ESTEL окрашивание в один тон (длина волос до 20 см)",
          price: 1000,
        },
        {
          id: 2,
          name: "ESTEL окрашивание в один тон (длина волос от 20 см до 30 см)",
          price: 1400,
        },
      ],
    },
    {
      id: 1,
      name: "Стрижки",
      list: [
        {
          id: 1,
          name: "Женская стрижка (длина волос до 20 см)",
          price: 500,
        },
        {
          id: 2,
          name: "Женская стрижка (длина волос от 20 см до 30 см)",
          price: 550,
        },
      ],
    },
    {
      id: 2,
      name: "Окрашивание",
      list: [
        {
          id: 1,
          name: "ESTEL окрашивание в один тон (длина волос до 20 см)",
          price: 1000,
        },
        {
          id: 2,
          name: "ESTEL окрашивание в один тон (длина волос от 20 см до 30 см)",
          price: 1400,
        },
      ],
    },
    {
      id: 1,
      name: "Стрижки",
      list: [
        {
          id: 1,
          name: "Женская стрижка (длина волос до 20 см)",
          price: 500,
        },
        {
          id: 2,
          name: "Женская стрижка (длина волос от 20 см до 30 см)",
          price: 550,
        },
      ],
    },
    {
      id: 2,
      name: "Окрашивание",
      list: [
        {
          id: 1,
          name: "ESTEL окрашивание в один тон (длина волос до 20 см)",
          price: 1000,
        },
        {
          id: 2,
          name: "ESTEL окрашивание в один тон (длина волос от 20 см до 30 см)",
          price: 1400,
        },
      ],
    },
  ],
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
