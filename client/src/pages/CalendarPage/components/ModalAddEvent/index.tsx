import React from "react";
import Spiner from "../../../../components/Spiner";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import FormicAddEvent from "../FormicAddEvent";
import { IColor } from "../../../../ducks/colors/contracts/state";
import { myNewEvent } from "../../../../ducks/calendar/contracts/types";

interface IModalAddEvent {
    modalIsOpen: boolean;
    closeModal: () => void;
    addingElement: myNewEvent | undefined;
    colors: IColor[];
    isAdding: boolean;
}

const ModalAddEvent = ({
    modalIsOpen,
    closeModal,
    addingElement,
    colors,
    isAdding,
}: IModalAddEvent): React.ReactElement => {
    return (
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormicAddEvent closeModal={closeModal} newEvent={addingElement} colors={colors} isAdding={isAdding} />
                {isAdding ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalAddEvent;