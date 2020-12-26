import React from "react";
import Spiner from "../../../../components/Spiner";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import FormicAddEvent from "../FormicAddEvent";
import { addNewEvent } from "../../../../ducks/calendar/actionCreators/addNewEvent";
import { IColor } from "../../../../ducks/colors/contracts/state";
import { myNewEvent } from "../../../../ducks/calendar/contracts/types";

interface IModalAddEvent {
    modalIsOpen: boolean;
    closeModal: () => void;
    addingElement: myNewEvent | undefined;
    colors: IColor[];
}

const ModalAddEvent = ({ modalIsOpen, closeModal, addingElement, colors }: IModalAddEvent): React.ReactElement => {
    const isAdding = false;
    return (
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormicAddEvent
                    addNewEvent={addNewEvent}
                    closeModal={closeModal}
                    newEvent={addingElement}
                    colors={colors}
                    isAdding={isAdding}
                />
                {isAdding ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalAddEvent;
