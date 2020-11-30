import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import FormEditCategory from "../FormEditCategory";
import "./styles.scss";
import { IColor } from "../../../../ducks/colors/contracts/state";
type ModalEditCategoryProps = {
    open: boolean;
    handleClose: () => void;
    selectedCategory: {
        _id: string;
        name: string;
        color: IColor;
    };
    categoryList: {
        _id: string;
        name: string;
        color: IColor;
    }[];
};

const ModalEditCategory = ({ open, handleClose, selectedCategory, categoryList }: ModalEditCategoryProps) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} className="dialog">
            <DialogContent>
                <FormEditCategory
                    handleClose={handleClose}
                    selectedCategory={selectedCategory}
                    categoryList={categoryList}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ModalEditCategory;
