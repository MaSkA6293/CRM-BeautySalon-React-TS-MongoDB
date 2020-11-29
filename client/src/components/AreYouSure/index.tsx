import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IAlertDialog {
    open: boolean;
    setOpen: (data: boolean) => void;
    handlerDelet: () => void;
    text: string;
}
export const AreYouSure: React.FC<IAlertDialog> = ({
    open,
    setOpen,
    handlerDelet,
    text,
}: IAlertDialog): React.ReactElement => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Нет
                    </Button>
                    <Button onClick={handlerDelet} color="primary" autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
