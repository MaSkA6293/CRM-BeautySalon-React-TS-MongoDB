import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { IColor } from "../../../../ducks/colors/contracts/state";
import "./styles.scss";

type SimpleDialogProps = {
    open: boolean;
    onClose: () => void;
    handleSelectColor: (color: string) => void;
    colors: IColor[];
};

function SimpleDialog({ onClose, open, colors, handleSelectColor }: SimpleDialogProps) {
    return (
        <Dialog onClose={onClose} open={open}>
            <div className="select-color">
                {colors.map((color, index) => {
                    return (
                        <div className="select-color__wraper" key={index}>
                            <div
                                className="select-color__item"
                                style={{ backgroundColor: color.hex }}
                                onClick={() => handleSelectColor(color._id.toString())}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
}

type SelectColorProps = {
    setSelectedColor: any;
    colors: IColor[];
    disabled: boolean;
    title: string;
};

export default function SelectColor({ setSelectedColor, colors, disabled, title }: SelectColorProps) {
    const [open, setOpen] = useState(false);

    const handleSelectColor = (_id: string) => {
        setSelectedColor(_id);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" disabled={disabled} onClick={() => setOpen(true)}>
                {title}
            </Button>
            <SimpleDialog
                open={open}
                onClose={() => setOpen(false)}
                handleSelectColor={(_id: string) => handleSelectColor(_id)}
                colors={colors}
            />
        </>
    );
}
