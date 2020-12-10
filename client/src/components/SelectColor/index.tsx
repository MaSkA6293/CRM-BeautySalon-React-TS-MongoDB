import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { IColor } from "../../ducks/colors/contracts/state";
import "./styles.scss";

type SimpleDialogProps = {
    open: boolean;
    onClose: () => void;
    handleSelectColor: (color: IColor) => void;
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
                                onClick={() => handleSelectColor(color)}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
}

type SelectColorProps = {
    setSelectedColor: (data: IColor) => void;
    colors: IColor[];
    disabled: boolean;
    title: string;
};

export default function SelectColor({ setSelectedColor, colors, disabled, title }: SelectColorProps) {
    const [open, setOpen] = useState(false);

    const handleSelectColor = (color: IColor) => {
        setSelectedColor(color);
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
                handleSelectColor={(color: IColor) => handleSelectColor(color)}
                colors={colors}
            />
        </>
    );
}
