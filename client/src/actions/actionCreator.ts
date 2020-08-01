import {
  CHANGE_DATE,
  NEXT_DATE,
  PREV_DATE,
  CREATE_NEW_RECORD,
  EDIT_RECORD,
  DELET_RECORD,
} from "../constants";

import { AppActionTypes, RecordActionTypes, IRecord } from "../types";

export const changeDate = (date: Date): AppActionTypes => ({
  type: CHANGE_DATE,
  payload: { date },
});

export const nextDate = (date: Date): AppActionTypes => ({
  type: NEXT_DATE,
  payload: { date },
});

export const prevDate = (date: Date): AppActionTypes => ({
  type: PREV_DATE,
  payload: { date },
});

export const createNewRecord = (data: IRecord): RecordActionTypes => ({
  type: CREATE_NEW_RECORD,
  payload: data,
});
export const editRecord = (data: IRecord): RecordActionTypes => ({
  type: EDIT_RECORD,
  payload: data,
});

export const deletRecord = (id: number): RecordActionTypes => {
  return {
    type: DELET_RECORD,
    payload: { id },
  };
};
