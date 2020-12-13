import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormEditCategory from "../FormEditCategory";
import "./styles.scss";
import { itemCategoriesListPlusColor } from "../../../../../../ducks/categories/selector";
import Spiner from "../../../../../../components/Spiner";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
interface IModalEditCategory {
    open: boolean;
    handleClose: () => void;
    selectedCategory: itemCategoriesListPlusColor;
    categoryIsEditing: boolean;
    categoryIsDeleting: boolean;
    colors: IColor[];
}

const ModalEditCategory: React.FC<IModalEditCategory> = ({
    open,
    handleClose,
    selectedCategory,
    categoryIsEditing,
    categoryIsDeleting,
    colors,
}: IModalEditCategory) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormEditCategory
                    handleClose={handleClose}
                    selectedCategory={selectedCategory}
                    isEditing={categoryIsEditing}
                    isDeleting={categoryIsDeleting}
                    colors={colors}
                />
                {categoryIsEditing || categoryIsDeleting ? <Spiner /> : ""}
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditCategory;
