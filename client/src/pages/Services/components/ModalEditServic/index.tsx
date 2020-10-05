import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormEditService from "../FormEditService";
import "./styles.scss";

type ModalEditServiceProps = {
  open: boolean;
  handleClose: () => void;
  selectedServic: any;
};

const ModalEditService = ({
  open,
  handleClose,
  selectedServic,
}: ModalEditServiceProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      className="dialog"
    >
      <DialogContent>
        <FormEditService
          handleClose={handleClose}
          selectedServic={selectedServic}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditService;
