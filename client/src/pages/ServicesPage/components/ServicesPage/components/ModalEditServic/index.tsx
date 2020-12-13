import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormEditService from "../FormEditService";
import "./styles.scss";
import { ICategory } from "../../../../types";
import { ISelectServicesToShow } from "../../../../../../ducks/services/selector";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
import Spiner from "../../../../../../components/Spiner";

interface IModalEditService {
    open: boolean;
    handleClose: () => void;
    selectedServic: ISelectServicesToShow;
    categoryList: ICategory[];
    colors: IColor[];
    isEditing: boolean;
    isDeleting: boolean;
}

const ModalEditService = ({
    open,
    handleClose,
    selectedServic,
    categoryList,
    colors,
    isEditing,
    isDeleting,
}: IModalEditService): React.ReactElement => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormEditService
                    handleClose={handleClose}
                    selectedServic={selectedServic}
                    categoryList={categoryList}
                    colors={colors}
                    isEditing={isEditing}
                    isDeleting={isDeleting}
                />
                {isEditing || isDeleting ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditService;
