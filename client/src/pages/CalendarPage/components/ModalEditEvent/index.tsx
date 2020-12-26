import React from "react";
import Spiner from "../../../../components/Spiner";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import FormicEditEvent from "../FormicEditEvent";
import { editEvent } from "../../../../ducks/calendar/actionCreators/editEvent";
type myEvent = {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
};
interface IModalEditEvent {
    modalIsOpen: boolean;
    closeModal: () => void;
    editingElement: myEvent | undefined;
}

const ModalEditEvent = ({ modalIsOpen, closeModal, editingElement }: IModalEditEvent): React.ReactElement => {
    const isEditing = false;
    const isDeleting = false;
    return (
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormicEditEvent
                    editEvent={editEvent}
                    deletEvent={() => undefined}
                    closeModal={closeModal}
                    currentEvent={editingElement}
                    eventIsEditing={false}
                    eventIsDeleting={false}
                />
                {isEditing || isDeleting ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditEvent;
