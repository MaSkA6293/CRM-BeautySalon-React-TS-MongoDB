import React, { useState } from "react";
import "./FormAddRecord.scss";
import Modal from "react-modal";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Marker from "../Marker/Marker";
import { IRecord } from "../../../types";
import { IColor } from "../../../types/typesColors";
import { IClient } from "../../../types/typesClients";
import { formatDateToSave } from "../../../functions";

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

type FormAddRecordProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  clients: IClient[];
  startRecordTime: string;
  setStartRecordTime: any;
  createNewRecord: (data: IRecord) => void;
  date: string;
  colors: IColor[];
  finishRecordTime: any;
  setfinishRecordTime: any;
};

const FormAddRecord = ({
  modalIsOpen,
  closeModal,
  clients,
  startRecordTime,
  setStartRecordTime,
  finishRecordTime,
  setfinishRecordTime,
  createNewRecord,
  date,
  colors,
}: FormAddRecordProps) => {
  const [client, setClient] = useState(0);
  const [activColorId, setActivColorId] = useState(1);

  const handlerChangeTimeStart = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setStartRecordTime(e.currentTarget.value);
  };

  const handlerChangeTimeEnd = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setfinishRecordTime(e.currentTarget.value);
  };

  const handlerCreateRecord = (e: any) => {
    e.preventDefault();
    if (client !== 0) {
      createNewRecord({
        id: +new Date(),
        clientId: client,
        date: formatDateToSave(date),
        timeStart: startRecordTime,
        timeEnd: finishRecordTime,
        color: activColorId,
      });
      setClient(0);
      setfinishRecordTime(startRecordTime);
      closeModal();
    } else {
      alert("Выберите клиента");
    }
  };

  const handleChangeClient = (e: any) => {
    if (e.target.value !== "") {
      setClient(+e.target.value);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Добавить запись"
        ariaHideApp={false}
      >
        <form className="addNewWrite">
          <button onClick={closeModal} className="addNewWrite__ModalClose">
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
          <div className="addNewWrite__wraper">
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
                  <Marker
                    key={index}
                    addclass={classNames(
                      "markerAll",
                      color.id === activColorId ? "activeColor" : ""
                    )}
                    color={color.hex}
                    onClick={() => setActivColorId(color.id)}
                  />
                );
              })}
            </div>

            <button
              className="button addNewWrite__button save"
              onClick={handlerCreateRecord}
            >
              Создать запись
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default FormAddRecord;
