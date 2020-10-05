import React, { useState } from "react";
import "./FormEditRecord.scss";
import Modal from "react-modal";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDateToSave, formatDateToInput } from "../../../functions";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Marker from "../Marker/Marker";
import { IRecord } from "../../../types";

import { IColor } from "../../../types/typesColors";

import { IClient } from "../../../types/typesClients";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
  },
};

type FormEditRecordProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  clients: IClient[];
  editRecord: (data: IRecord) => void;
  deletRecord: (id: number) => void;
  date: string;
  colors: IColor[];
  currentRecord: IRecord;
};

const FormEditRecord = ({
  modalIsOpen,
  closeModal,
  clients,
  editRecord,
  deletRecord,
  colors,
  currentRecord,
}: FormEditRecordProps) => {
  const [client, setClient] = useState(currentRecord.clientId);
  const [activColorId, setActivColorId] = useState(currentRecord.color);
  const [date, setDate] = useState(currentRecord.date);

  const [startRecordTime, setStartRecordTime] = useState(
    currentRecord.timeStart
  );
  const [finishRecordTime, setfinishRecordTime] = useState(
    currentRecord.timeEnd
  );

  const handlerChangeTimeStart = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setStartRecordTime(e.currentTarget.value);
  };
  const handlerChangeTimeEnd = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setfinishRecordTime(e.currentTarget.value);
  };
  const handlerEditRecord = (e: any) => {
    e.preventDefault();
    editRecord({
      id: currentRecord.id,
      clientId: client,
      date: formatDateToSave(date),
      timeStart: startRecordTime,
      timeEnd: finishRecordTime,
      color: activColorId,
    });
    setClient(0);
    setfinishRecordTime(currentRecord.timeEnd);
    closeModal();
  };

  const handlerDeletRecord = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let quest = window.confirm("Вы действительно хотите удалить встречу");
    if (quest) {
      deletRecord(currentRecord.id);
      closeModal();
    }
  };

  const handleChangeClient = (e: any) => {
    if (e.target.value !== "") {
      setClient(+e.target.value);
    }
  };

  const handleChangeDate = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Редактировать запись"
        ariaHideApp={false}
      >
        <form className="addNewWrite">
          <button onClick={closeModal} className="addNewWrite__ModalClose">
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
          <div className="addNewWrite__wraper">
            <label>
              {" "}
              Выберите дату
              <input
                type="date"
                value={formatDateToInput(date)}
                onChange={handleChangeDate}
              ></input>
            </label>
            <label>
              Выберите клиента
              <select onChange={handleChangeClient} value={client}>
                <option value="" />
                {clients.map((client, index) => {
                  return (
                    <option key={index} value={client._id}>
                      {`${client.name} ${client.female}`}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Время начала встречи
              <input
                type="time"
                value={startRecordTime}
                onChange={handlerChangeTimeStart}
              />
            </label>
            <label>
              Время окончания встречи
              <input
                type="time"
                value={finishRecordTime}
                onChange={handlerChangeTimeEnd}
              />
            </label>
            <div className="addNewWrite__colors">
              {colors.map((color, index) => {
                return (
                  <></>
                  // <Marker
                  //   key={index}
                  //   addclass={classNames(
                  //     "markerAll",
                  //     color._id === activColorId ? "activeColor" : ""
                  //   )}
                  //   color={color.hex}
                  //   onClick={() => setActivColorId(color._id)}
                  // />
                );
              })}
            </div>

            <button
              className="button addNewWrite__button save"
              onClick={handlerEditRecord}
            >
              Сохранить изменения
            </button>
            <button
              className={"button addNewWrite__button delet"}
              onClick={handlerDeletRecord}
            >
              Удалить встречу
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default FormEditRecord;
