import React from "react";
import { useDispatch } from "react-redux";
import "./styles.scss";
import Spiner from "../../../../components/Spiner";
import { runAddClient } from "../../../../ducks/clients/actionCreators/addClient";
import { IClientValues } from "../../../../ducks/clients/contracts/state";
import FormicAddClient from "./FormicAddClient";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

interface IModalAddClient {
    modalIsOpen: boolean;
    closeModal: () => void;
    clientIsAdding: boolean;
}

export const ModalAddClient: React.FC<IModalAddClient> = ({
    modalIsOpen,
    closeModal,
    clientIsAdding,
}: IModalAddClient): React.ReactElement => {
    const dispatch = useDispatch();
    const handlerAddClient = (values: IClientValues) => {
        dispatch(
            runAddClient(
                {
                    name: values.name,
                    surname: values.surname,
                    phone: values.phone,
                },
                closeModal,
            ),
        );
    };

    return (
        <div>
            <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
                <DialogContent style={{ minWidth: "200px", overflow: "hidden" }}>
                    <FormicAddClient
                        handlerAddClient={handlerAddClient}
                        clientIsAdded={clientIsAdding}
                        closeModal={closeModal}
                    />
                    {clientIsAdding ? <Spiner /> : ""}
                </DialogContent>
            </Dialog>
        </div>
    );
};
