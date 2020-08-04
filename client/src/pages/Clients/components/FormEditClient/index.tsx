import React from "react";
import "./styles.scss";
import Modal from "react-modal";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector } from "react-redux";
import Spiner from "../../../../components/Spiner";
import { IClient } from "../../../../types/typesClients";
import { IClientValues } from "../../../../types/typesClients";
import FormicEditClient from "./FormicEditClient";
import cogoToast from "cogo-toast";
type FormAddClientProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  currentClient: IClient;
  deletClient: (_id: number, callback: () => void) => void;
  editClient: (data: IClient, callback: () => void) => void;
};

export const FormEditClient = ({
  modalIsOpen,
  closeModal,
  currentClient,
  editClient,
  deletClient,
}: FormAddClientProps) => {
  const {
    clientDeleted,
    clientIsDeleting,
    clientDeletError,
    clientEdited,
    clientIsEditing,
    clientEditIsFail,
    clientEditError,
    clientDeletIsFail,
  } = useSelector(({ clients }: IGlobalStore) => {
    return {
      clientDeleted: clients.clientDeleted,
      clientIsDeleting: clients.clientIsDeleting,
      clientDeletError: clients.clientDeletError,
      clientEdited: clients.clientEdited,
      clientIsEditing: clients.clientIsEditing,
      clientEditIsFail: clients.clientEditIsFail,
      clientEditError: clients.clientEditError,
      clientDeletIsFail: clients.clientDeletIsFail,
    };
  });

  const handlerEditClient = (values: IClientValues, id: number) => {
    editClient(
      {
        _id: id,
        name: values.name,
        female: values.female,
        phone: values.phone,
      },
      closeModal
    );
  };

  const handlerDeletClient = (id: number) => {
    const question = window.confirm(
      "Вы действительно хотите удалить данные клиента"
    );
    if (question) {
      deletClient(id, closeModal);
    }
  };
  if (clientDeleted) {
    cogoToast.success(<div className="message"> Клиент успешно удален</div>);
  }
  if (clientDeletError) {
    cogoToast.error(<div className="message">{clientDeletError}</div>);
  }
  if (clientEdited) {
    cogoToast.success(
      <div className="message"> Данные клиента успешно изменены</div>
    );
  }
  if (clientEditError) {
    cogoToast.error(<div className="message"> {clientEditError}</div>);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <FormicEditClient
          currentClient={currentClient}
          closeModal={closeModal}
          editClient={handlerEditClient}
          deletClient={handlerDeletClient}
          clientDeleted={clientDeleted}
          clientIsDeleting={clientIsDeleting}
          clientEdited={clientEdited}
          clientIsEditing={clientIsEditing}
          clientEditIsFail={clientEditIsFail}
          clientDeletIsFail={clientDeletIsFail}
        />

        {clientIsDeleting || clientIsEditing ? <Spiner /> : ""}
      </Modal>
    </div>
  );
};
