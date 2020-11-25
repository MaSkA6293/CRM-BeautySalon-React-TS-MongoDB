import React, { useEffect } from "react";
import "./styles.scss";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector } from "react-redux";
import Spiner from "../../../../components/Spiner";
import { IClient } from "../../../../types/typesClients";
import { IClientValues } from "../../../../types/typesClients";
import FormicEditClient from "./FormicEditClient";
import cogoToast from "cogo-toast";

import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

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
                surname: values.surname,
                phone: values.phone,
            },
            closeModal,
        );
    };

    const handlerDeletClient = (id: number) => {
        const question = window.confirm("Вы действительно хотите удалить данные клиента");
        if (question) {
            deletClient(id, closeModal);
        }
    };

    useEffect(() => {
        clientDeleted && cogoToast.success(<div className="message"> Клиент успешно удален</div>);
    }, [clientDeleted]);

    useEffect(() => {
        clientDeletError && cogoToast.error(<div className="message">{clientDeletError}</div>);
    }, [clientDeletError]);
    useEffect(() => {
        clientEdited && cogoToast.success(<div className="message"> Данные клиента успешно изменены</div>);
    }, [clientEdited]);

    useEffect(() => {
        clientEditError && cogoToast.error(<div className="message"> {clientEditError}</div>);
    }, [clientEditError]);

    return (
        <div>
            <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
                <DialogContent>
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
                </DialogContent>
            </Dialog>
        </div>
    );
};
