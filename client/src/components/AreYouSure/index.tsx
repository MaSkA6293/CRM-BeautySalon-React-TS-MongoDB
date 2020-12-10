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
    const handleDisagree = () => {
        setOpen(false);
    };
    const handlerAgree = () => {
        setOpen(false);
        handlerDelet();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDisagree} color="primary">
                        Нет
                    </Button>
                    <Button onClick={handlerAgree} color="primary" autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
