import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormAddCategory from "../FormAddCategory";
import "./styles.scss";

type ModalAddCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddCategory = ({ open, handleClose }: ModalAddCategoryProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      className="dialog"
    >
      <DialogContent>
        <FormAddCategory handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddCategory;
