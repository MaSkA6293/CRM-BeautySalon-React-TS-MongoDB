import { CREATE_NEW_RECORD, EDIT_RECORD, DELET_RECORD } from "../constants";
import { RecordActionTypes, IstateRecords } from "../types";

const initialState: IstateRecords = {
  records: [
    {
      id: 1,
      clientId: 1,
      date: "7.15.2020",
      timeStart: "09:30",
      timeEnd: "10:00",
      color: 1,
    },
    {
      id: 2,
      clientId: 2,
      date: "7.15.2020",
      timeStart: "10:30",
      timeEnd: "11:00",
      color: 2,
    },
    {
      id: 1593619086109,
      clientId: 3,
      date: "7.15.2020",
      timeStart: "12:00",
      timeEnd: "14:00",
      color: 3,
    },
  ],
};

const stateRecords = (
  state: IstateRecords = initialState,
  action: RecordActionTypes
) => {
  switch (action.type) {
    case CREATE_NEW_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    case EDIT_RECORD:
      return {
        ...state,
        records: state.records.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case DELET_RECORD:
      return {
        ...state,
        records: state.records.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default stateRecords;
