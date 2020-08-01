import React, { useState, useEffect } from "react";

import "./styles.scss";
import ClientsHeader from "./components/ClientsHeader";

import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";

import { ClientsList, ModalAddClient, FormEditClient } from "./components";
import { IGlobalStore } from "../../reducers/rootReducer";
import {
  editClient,
  deletClient,
  getClients,
} from "../../actions/actionClients";

import { IClient } from "../../types/typesClients";
import Spiner from "../../components/Spiner";

const initialSelectedClient = {
  _id: 0,
  name: "",
  female: "",
  phone: "",
};

const Clients = () => {
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(initialSelectedClient);

  useEffect(() => {
    dispatch(getClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    clients,
    clientsIsLoading,
    clientGetIsFail,
    clientGetError,
  } = useSelector(({ clients }: IGlobalStore) => {
    return {
      clients: clients.clientsList,
      clientsIsLoading: clients.clientsIsLoading,
      clientGetIsFail: clients.clientGetIsFail,
      clientGetError: clients.clientGetError,
    };
  });
  const dispatch = useDispatch();

  const handlerEditClient = (_id: number) => {
    const currentEdit = clients.find((client: IClient) => client._id === _id);
    if (currentEdit) {
      setSelectedClient(currentEdit);
      setEditIsOpen(true);
    }
  };

  return (
    <>
      {" "}
      <div className="Clients">
        <ClientsHeader setAddIsOpen={setAddIsOpen} />

        {clientGetIsFail ? (
          <Message message={clientGetError} status={false} />
        ) : (
          ""
        )}
        {clientsIsLoading ? (
          <Spiner />
        ) : (
          <ClientsList clients={clients} edit={handlerEditClient} />
        )}
      </div>
      {addIsOpen ? (
        <ModalAddClient
          modalIsOpen={addIsOpen}
          closeModal={() => setAddIsOpen(false)}
        />
      ) : (
        ""
      )}
      {editIsOpen ? (
        <FormEditClient
          modalIsOpen={editIsOpen}
          closeModal={() => setEditIsOpen(false)}
          currentClient={selectedClient}
          editClient={(data: IClient, callback: () => void) =>
            dispatch(editClient(data, callback))
          }
          deletClient={(_id: number, callback: () => void) =>
            dispatch(deletClient(_id, callback))
          }
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Clients;
