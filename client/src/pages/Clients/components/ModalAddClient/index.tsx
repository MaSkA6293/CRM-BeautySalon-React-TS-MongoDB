import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import Spiner from "../../../../components/Spiner";
import { runAddClient } from "../../../../sagas/pageClients/addClient";
import { IClientValues } from "../../../../types/typesClients";
import FormicAddClient from "./FormicAddClient";
import cogoToast from "cogo-toast";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

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
    clientMessageSuccess,
    clientMessageError,
    clientIsAdded,
  } = useSelector(({ clients }: IGlobalStore) => {
    return {
      clientMessageSuccess: clients.clientMessageSuccess,
      clientMessageError: clients.clientMessageError,
      clientIsAdded: clients.clientIsAdded,
      clientAdded: clients.clientAdded,
      clientAddIsFail: clients.clientAddIsFail,
      clientAddError: clients.clientAddError,
    };
  });

  const handlerAddClient = (values: IClientValues) => {
    dispatch(
      runAddClient(
        {
          name: values.name,
          surname: values.surname,
          phone: values.phone,
        },
        closeModal
      )
    );
  };

  useEffect(() => {
    clientMessageSuccess &&
      cogoToast.success(<div className="message">{clientMessageSuccess}</div>);
  }, [clientMessageSuccess]);

  useEffect(() => {
    clientMessageError &&
      cogoToast.error(<div className="message">{clientMessageError}</div>);
  }, [clientMessageError]);

  return (
    <div>

      <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth={true}
        className="dialog"
      >
        <DialogContent style={{ minWidth: "200px", overflow: "hidden" }}>
          <FormicAddClient
            handlerAddClient={handlerAddClient}
            clientIsAdded={clientIsAdded}
            closeModal={closeModal}
          />
          {clientIsAdded ? <Spiner /> : ""}
        </DialogContent>
      </Dialog>
    </div>
  );
};
