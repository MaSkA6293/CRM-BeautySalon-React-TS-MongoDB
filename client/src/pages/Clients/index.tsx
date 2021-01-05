import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { ClientsHeader, ClientsList, ModalAddClient, FormEditClient } from "./components";
import { getClientsRequest } from "../../ducks/clients/actionCreators/fetchClients";
import { runDeletClient } from "../../ducks/clients/actionCreators/deletClient";
import { runEditClient } from "../../ducks/clients/actionCreators/editClient";
import { IClient } from "../../ducks/clients/contracts/state";
import Spiner from "../../components/Spiner";
import Message from "../../components/Message";
import {
    selectClientMessageSuccess,
    selectClientMessageError,
    selectClientsList,
    selectClientsIsLoading,
    selectClientIsDeleting,
    selectClientIsEditing,
    selectClientIsAdding,
} from "../../ducks/clients/selector";

const initialSelectedClient = {
    _id: "0",
    name: "",
    surname: "",
    phone: "",
    color: "",
};

const Clients: React.FC = (): React.ReactElement => {
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(initialSelectedClient);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getClientsRequest());
    }, [dispatch]);
    const clientMessageError = useSelector(selectClientMessageError);
    const clientMessageSuccess = useSelector(selectClientMessageSuccess);
    const clients = useSelector(selectClientsList);
    const clientsIsLoading = useSelector(selectClientsIsLoading);
    const clientIsDeleting = useSelector(selectClientIsDeleting);
    const clientIsEditing = useSelector(selectClientIsEditing);
    const clientIsAdding = useSelector(selectClientIsAdding);
    const handlerEditClient = (_id: string) => {
        const currentEdit = clients.find((client: IClient) => client._id === _id);
        if (currentEdit) {
            setSelectedClient(currentEdit);
            setEditIsOpen(true);
        }
    };
    const editClient = (data: IClient, callback: () => void) => {
        return dispatch(runEditClient(data, callback));
    };
    const deletClient = (_id: string, callback: () => void) => {
        return dispatch(runDeletClient(_id, callback));
    };
    return (
        <>
            {clientMessageSuccess && <Message isOpen status={"success"} message={clientMessageSuccess} />}{" "}
            {clientMessageError && <Message isOpen status={"error"} message={clientMessageError} />}
            <div className="clients">
                <ClientsHeader setAddIsOpen={setAddIsOpen} />
                {clientsIsLoading ? <Spiner /> : <ClientsList clients={clients} edit={handlerEditClient} />}
            </div>
            {addIsOpen ? (
                <ModalAddClient
                    modalIsOpen={addIsOpen}
                    closeModal={() => setAddIsOpen(false)}
                    clientIsAdding={clientIsAdding}
                />
            ) : (
                ""
            )}
            {editIsOpen ? (
                <FormEditClient
                    modalIsOpen={editIsOpen}
                    closeModal={() => setEditIsOpen(false)}
                    currentClient={selectedClient}
                    editClient={editClient}
                    deletClient={deletClient}
                    clientIsDeleting={clientIsDeleting}
                    clientIsEditing={clientIsEditing}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default Clients;
