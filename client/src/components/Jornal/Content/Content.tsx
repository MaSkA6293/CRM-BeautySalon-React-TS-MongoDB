import React, { useState } from "react";
import "./Content.scss";

import { useSelector, useDispatch } from "react-redux";

import ContentItem from "./ContentItem/ContentItem";
import FormAddRecord from "../FormAddRecord/FormAddRecord";
import FormEditRecord from "../FormEditRecord/FormEditRecord";
import avatarDefault from "../../../assets/avatar/default-avatar.png";

import { formatDateToSave } from "../../../functions";

import { IRecord } from "../../../types";
import { IColor } from "../../../types/typesColors";
import { IClient } from "../../../types/typesClients";
import {
  createNewRecord,
  editRecord,
  deletRecord,
} from "../../../actions/actionCreator";

const diffDates = (day_one: number, day_two: number): number => {
  return (day_one - day_two) / (60 * 1000);
};

const Content = () => {
  const [modalAddRecordIsOpen, setmodalAddRecordIsOpen] = useState(false);
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [startRecordTime, setStartRecordTime] = useState("");
  const [finishRecordTime, setfinishRecordTime] = useState("");

  const [currentRecordEdit, setCurrentRecordEdit] = useState({
    clientId: 1,
    color: 1,
    date: "",
    id: 1,
    timeStart: "",
    timeEnd: "",
  });
  const { date, workTime, clients, records, colors } = useSelector(
    ({ stateApp, clients, records, colors }: any) => {
      return {
        date: stateApp.date,
        workTime: stateApp.workTime,
        clients: clients,
        records: records.filter(
          (record: IRecord) => record.date === formatDateToSave(stateApp.date)
        ),
        colors: colors,
      };
    }
  );

  const dispatch = useDispatch();

  const openModalAddRecord = (
    e: React.SyntheticEvent<HTMLDivElement>
  ): void => {
    const time = e.currentTarget.firstChild?.textContent;
    if (time) {
      setStartRecordTime(time);
      setfinishRecordTime(time);
    }
    setmodalAddRecordIsOpen(true);
  };

  const handlerRecordClick = (
    e: React.SyntheticEvent<HTMLDivElement>
  ): void => {
    const recordId = e.currentTarget.dataset.recordid;
    const currentRecord = records.find(
      (r: IRecord) => r.id === Number(recordId)
    );
    if (currentRecord) {
      setCurrentRecordEdit(currentRecord);
      setEditIsOpen(true);
    }
  };

  return (
    <div className="Content">
      {records
        ? records.map((r: IRecord, index: number) => {
            return (
              <div
                key={index}
                className="Content__ActivWrite ActivWrite"
                data-recordid={r.id}
                style={{
                  height:
                    diffDates(
                      +new Date(`${r.date}  ${r.timeEnd}`),
                      +new Date(`${r.date}  ${r.timeStart}`)
                    ) + "px",
                  top:
                    diffDates(
                      +new Date(`${r.date}  ${r.timeStart}`),
                      +new Date(`${r.date}`)
                    ) -
                    9 * 60 +
                    "px",
                  backgroundColor: colors.find((c: IColor) => c.id === r.color)
                    ?.hex,
                }}
                onClick={handlerRecordClick}
              >
                <div className="ActivWrite__avatar">
                  <img src={avatarDefault} alt="avatar" />{" "}
                </div>
                <div className="ActivWrite__main">
                  <div className="ActivWrite__name">
                    {clients.map((c: IClient) =>
                      c._id === r.clientId ? `${c.name} ${c.female}` : ""
                    )}
                  </div>
                  <div className="ActivWrite__service"> Стрижка</div>
                </div>
              </div>
            );
          })
        : ""}

      {workTime.map((time: string, index: number) => {
        return (
          <ContentItem
            key={index}
            time={time}
            addNewWrite={openModalAddRecord}
          />
        );
      })}
      {modalAddRecordIsOpen ? (
        <FormAddRecord
          modalIsOpen={modalAddRecordIsOpen}
          closeModal={() => setmodalAddRecordIsOpen(false)}
          clients={clients}
          startRecordTime={startRecordTime}
          setStartRecordTime={setStartRecordTime}
          createNewRecord={(data: IRecord) => dispatch(createNewRecord(data))}
          date={date}
          colors={colors}
          finishRecordTime={finishRecordTime}
          setfinishRecordTime={setfinishRecordTime}
        />
      ) : (
        ""
      )}
      {modalEditIsOpen ? (
        <FormEditRecord
          modalIsOpen={modalEditIsOpen}
          closeModal={() => setEditIsOpen(false)}
          clients={clients}
          currentRecord={currentRecordEdit}
          deletRecord={(id: number) => dispatch(deletRecord(id))}
          editRecord={(data: IRecord) => dispatch(editRecord(data))}
          date={date}
          colors={colors}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Content;
