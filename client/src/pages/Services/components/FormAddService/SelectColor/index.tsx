import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { IColor } from "../../../../../types/typesColors";
import "./styles.scss";

type SimpleDialogProps = {
  open: boolean;
  onClose: any;
  handleSelectColor: (color: string) => void;
  colors: IColor[];
};

function SimpleDialog({
  onClose,
  open,
  colors,
  handleSelectColor,
}: SimpleDialogProps) {
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
};

export default function SelectColor({
  setSelectedColor,
  colors,
  disabled,
}: SelectColorProps) {
  const [open, setOpen] = useState(false);

  const handleSelectColor = (_id: string) => {
    setSelectedColor(_id);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        Цвет услуги
      </Button>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        handleSelectColor={(_id: string) => handleSelectColor(_id)}
        colors={colors}
      />
    </div>
  );
}
