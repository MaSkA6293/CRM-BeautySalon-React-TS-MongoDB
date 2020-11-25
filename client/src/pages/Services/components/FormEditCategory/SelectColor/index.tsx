import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { IColor } from "../../../../../types/typesColors";
import "./styles.scss";

type SimpleDialogProps = {
    open: boolean;
    onClose: any;
    handleSelectColor: (color: IColor) => void;
    colors: IColor[];
};

function SimpleDialog({ onClose, open, colors, handleSelectColor }: SimpleDialogProps) {
    return (
        <Dialog onClose={onClose} open={open}>
            <div className="SelectColor">
                {colors.map((color, index) => {
                    return (
                        <div className="SelectColor__wraper" key={index}>
                            <div
                                className="SelectColor__item"
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
    setSelectedColor: any;
    colors: IColor[];
    serviceIsEdited: boolean;
};

export default function SelectColor({ setSelectedColor, colors, serviceIsEdited }: SelectColorProps) {
    const [open, setOpen] = useState(false);

    const handleSelectColor = (color: IColor) => {
        setSelectedColor(color);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)} disabled={serviceIsEdited}>
                Цвет услуги
            </Button>
            <SimpleDialog
                open={open}
                onClose={() => setOpen(false)}
                handleSelectColor={(color: IColor) => handleSelectColor(color)}
                colors={colors}
            />
        </div>
    );
}
