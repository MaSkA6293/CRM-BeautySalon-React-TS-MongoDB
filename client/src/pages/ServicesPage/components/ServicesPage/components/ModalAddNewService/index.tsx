import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormAddService from "../FormAddService";
import "./styles.scss";
import { ICategory } from "../../../../types";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
import Spiner from "../../../../../../components/Spiner";
interface IModalAddService {
    open: boolean;
    handleClose: () => void;
    categoryList: ICategory[];
    colors: IColor[];
    isAdding: boolean;
}

const ModalAddService = ({
    open,
    handleClose,
    categoryList,
    colors,
    isAdding,
}: IModalAddService): React.ReactElement => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent style={{ minWidth: "200px", overflow: "hidden" }}>
                <FormAddService
                    handleClose={handleClose}
                    categoryList={categoryList}
                    colors={colors}
                    isAdding={isAdding}
                />
                {isAdding ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalAddService;
