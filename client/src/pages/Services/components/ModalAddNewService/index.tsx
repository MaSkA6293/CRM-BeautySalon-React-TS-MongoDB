import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormAddService from "../FormAddService";
import "./styles.scss";

type ModalAddServiceProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddService = ({ open, handleClose }: ModalAddServiceProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <h2 className="Dialog__title">Добавить услугу</h2>

      <DialogContent>
        <FormAddService handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddService;
