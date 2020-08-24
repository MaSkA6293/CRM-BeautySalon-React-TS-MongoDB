import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { IColor } from "../../../../types/typesColors";
import "./styles.scss";

type SimpleDialogProps = {
  open: boolean;
  onClose: any;
  handleSelectColor: ({}: { color: string }) => void;
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
      <div className="SelectColor">
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className="SelectColor__item"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleSelectColor({ color: color.hex })}
            ></div>
          );
        })}
      </div>
    </Dialog>
  );
}

type SelectColorProps = {
  setSelectedColor: any;
  colors: IColor[];
};

export default function SelectColor({
  setSelectedColor,
  colors,
}: SelectColorProps) {
  const [open, setOpen] = useState(false);

  const handleSelectColor = ({ color }: { color: string }) => {
    setSelectedColor(color);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Выберите цвет
      </Button>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
        handleSelectColor={handleSelectColor}
        colors={colors}
      />
    </div>
  );
}
