import React from "react";
import Spiner from "../../../../components/Spiner";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import FormicEditEvent from "../FormicEditEvent";
import { IEvent } from "../../../../ducks/calendar/contracts/state";
import { IColor } from "../../../../ducks/colors/contracts/state";
import { IClient } from "../../../../ducks/clients/contracts/state";
interface IModalEditEvent {
    modalIsOpen: boolean;
    closeModal: () => void;
    editingElement: IEvent;
    isDeleting: boolean;
    isEditing: boolean;
    colors: IColor[];
    clients: IClient[];
}

const ModalEditEvent = ({
    modalIsOpen,
    closeModal,
    editingElement,
    isDeleting,
    isEditing,
    colors,
    clients,
}: IModalEditEvent): React.ReactElement => {
    return (
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormicEditEvent
                    closeModal={closeModal}
                    currentEvent={editingElement}
                    isEditing={isEditing}
                    isDeleting={isDeleting}
                    colors={colors}
                    clients={clients}
                />
                {isEditing || isDeleting ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditEvent;
