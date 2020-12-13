import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import "./styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch } from "react-redux";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
import SelectColor from "../../../../../../components/SelectColor";
import { runEditCategory } from "../../../../../../ducks/categories/actionCreators/editCategory";
import { runDeletCategory } from "../../../../../../ducks/categories/actionCreators/deletCategory";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import { AreYouSure } from "../../../../../../components/AreYouSure";

import { itemCategoriesListPlusColor } from "../../../../../../ducks/categories/selector";
const EditCategorySchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
});

interface IFormEditCategory {
    handleClose: () => void;
    selectedCategory: itemCategoriesListPlusColor;
    isEditing: boolean;
    isDeleting: boolean;
    colors: IColor[];
}

const FormEditCategory: React.FC<IFormEditCategory> = ({
    handleClose,
    selectedCategory,
    isEditing,
    isDeleting,
    colors,
}: IFormEditCategory) => {
    const initialValues = {
        name: selectedCategory.name,
    };
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState(selectedCategory.color);
    const [open, setOpen] = useState(false);

    interface IHandlerEditCategory {
        name: string;
    }
    const handlerEditCategory = (values: IHandlerEditCategory) => {
        const data = {
            _id: selectedCategory._id,
            name: values.name,
            colorId: selectedColor._id,
        };
        dispatch(runEditCategory(data, handleClose));
    };

    const handlerDelet = () => {
        dispatch(runDeletCategory(selectedCategory._id, handleClose));
    };
    return (
        <>
            <AreYouSure
                open={open}
                setOpen={setOpen}
                handlerDelet={handlerDelet}
                text={"Вы действительно хотите удалить категорию?"}
            />
            <Formik initialValues={initialValues} validationSchema={EditCategorySchema} onSubmit={handlerEditCategory}>
                {({ isValid, errors }) => (
                    <Form className="form">
                        <div className="form__title-btn-delet">
                            <h2 className="form__title">Редактировать</h2>
                            <Button disabled={isEditing || isDeleting} onClick={() => setOpen(true)}>
                                <DeleteSweepIcon />
                            </Button>
                        </div>
                        <div className="form__field field">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <TextFieldsIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Название"
                                        type="text"
                                        name="name"
                                        fullWidth
                                        error={errors.name ? true : false}
                                        autoComplete="false"
                                        className="form__item"
                                        disabled={isDeleting || isEditing}
                                    />
                                </div>
                            </div>
                            <div className="field__error">
                                <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                            </div>
                        </div>

                        <div className="form__select-color select-color">
                            <div
                                className="select-color__selected select-color__selected-margin-right "
                                style={{
                                    backgroundColor: selectedColor.hex,
                                }}
                            ></div>
                            <div className="select-color__button">
                                <SelectColor
                                    setSelectedColor={setSelectedColor}
                                    colors={colors}
                                    disabled={isEditing || isDeleting}
                                    title={"Цвет категории"}
                                />
                            </div>
                        </div>
                        <DialogActions>
                            <Button color="primary" type="submit" disabled={!isValid || isEditing || isDeleting}>
                                Сохранить
                            </Button>
                            <Button onClick={handleClose} color="primary" disabled={isEditing || isDeleting}>
                                Отмена
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormEditCategory;
