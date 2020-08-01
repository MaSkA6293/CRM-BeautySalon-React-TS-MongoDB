import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import Modal from "react-modal";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import Spiner from "../../../../components/Spiner";
import Message from "../../../../components/Message";
import { addClient } from "../../../../actions/actionClients";
import { IClientValues } from "../../../../types/typesClients";
import FormicAddClient from "./FormicAddClient";

type ModalAddClientProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const ModalAddClient = ({
  modalIsOpen,
  closeModal,
}: ModalAddClientProps) => {
  const dispatch = useDispatch();
  const {
    clientIsAdded,
    clientAdded,
    clientAddIsFail,
    clientAddError,
  } = useSelector(({ clients }: IGlobalStore) => {
    return {
      clientIsAdded: clients.clientIsAdded,
      clientAdded: clients.clientAdded,
      clientAddIsFail: clients.clientAddIsFail,
      clientAddError: clients.clientAddError,
    };
  });

  const handlerAddClient = (values: IClientValues) => {
    dispatch(
      addClient(
        {
          name: values.name,
          female: values.female,
          phone: values.phone,
        },
        closeModal
      )
    );
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <FormicAddClient
          handlerAddClient={handlerAddClient}
          clientIsAdded={clientIsAdded}
          clientAddIsFail={clientAddIsFail}
          clientAdded={clientAdded}
          closeModal={closeModal}
        />

        {clientAdded ? (
          <Message message={"Клиент успешно добавлен"} status={true} />
        ) : (
          ""
        )}
        {clientAddIsFail ? (
          <Message message={clientAddError} status={false} />
        ) : (
          ""
        )}

        {clientIsAdded ? <Spiner /> : ""}
      </Modal>
    </div>
  );
};
