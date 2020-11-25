import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormEditService from "../FormEditService";
import "./styles.scss";
import { ICategory } from "../../types";

type ModalEditServiceProps = {
    open: boolean;
    handleClose: () => void;
    selectedServic: any;
    categoryList: ICategory[];
};

const ModalEditService = ({ open, handleClose, selectedServic, categoryList }: ModalEditServiceProps) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormEditService
                    handleClose={handleClose}
                    selectedServic={selectedServic}
                    categoryList={categoryList}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditService;
