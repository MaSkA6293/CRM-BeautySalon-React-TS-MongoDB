import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormAddCategory from "../FormAddCategory";
import "./styles.scss";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
import Spiner from "../../../../../../components/Spiner";

interface IModalAddCategory {
    open: boolean;
    handleClose: () => void;
    colors: IColor[];
    categoryIsAdding: boolean;
}

const ModalAddCategory: React.FC<IModalAddCategory> = ({
    open,
    handleClose,
    colors,
    categoryIsAdding,
}: IModalAddCategory): React.ReactElement => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormAddCategory handleClose={handleClose} colors={colors} isAdding={categoryIsAdding} />
                {categoryIsAdding ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalAddCategory;
