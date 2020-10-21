import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormAddService from "../FormAddService";
import "./styles.scss";
import { ICategory } from "../../types";

type ModalAddServiceProps = {
  open: boolean;
  handleClose: () => void;
  categoryList: ICategory[];
};

const ModalAddService = ({
  open,
  handleClose,
  categoryList,
}: ModalAddServiceProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      className="dialog"
    >
      <DialogContent style={{ minWidth: "200px", overflow: "hidden" }}>
        <FormAddService handleClose={handleClose} categoryList={categoryList} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddService;
