import React from "react";
import "./styles.scss";
import Spiner from "../../../../components/Spiner";
import { IClient } from "../../../../ducks/clients/contracts/state";
import FormicEditClient from "./FormicEditClient";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

interface IFormAddClient {
    modalIsOpen: boolean;
    closeModal: () => void;
    currentClient: IClient;
    deletClient: (_id: number, callback: () => void) => void;
    editClient: (data: IClient, callback: () => void) => void;
    clientIsDeleting: boolean;
    clientIsEditing: boolean;
}

export const FormEditClient: React.FC<IFormAddClient> = ({
    modalIsOpen,
    closeModal,
    currentClient,
    editClient,
    deletClient,
    clientIsDeleting,
    clientIsEditing,
}: IFormAddClient): React.ReactElement => {
    const handlerEditClient = (values: IClient) => {
        editClient(values, closeModal);
    };
    const handlerDeletClient = (_id: number) => {
        deletClient(_id, closeModal);
    };

    return (
        <div>
            <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
                <DialogContent>
                    <FormicEditClient
                        currentClient={currentClient}
                        closeModal={closeModal}
                        editClient={handlerEditClient}
                        deletClient={handlerDeletClient}
                        clientIsDeleting={clientIsDeleting}
                        clientIsEditing={clientIsEditing}
                    />
                    {clientIsDeleting || clientIsEditing ? <Spiner /> : ""}
                </DialogContent>
            </Dialog>
        </div>
    );
};
