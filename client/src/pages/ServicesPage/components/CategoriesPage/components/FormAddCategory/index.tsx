import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

import "./styles.scss";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { useDispatch } from "react-redux";
import SelectColor from "../../../../../../components/SelectColor";

import { runAddCategory } from "../../../../../../ducks/categories/actionCreators/addCategory";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
const initialValues = {
    name: "",
};
const AddClientSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
});

interface IFormAddCategory {
    handleClose: () => void;
    colors: IColor[];
    isAdding: boolean;
}

const FormAddCategory: React.FC<IFormAddCategory> = ({
    handleClose,
    colors,
    isAdding,
}: IFormAddCategory): React.ReactElement => {
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState<IColor>(colors[0]);

    interface IAddServise {
        name: string;
    }
    const handlerAddCategory = (values: IAddServise) => {
        const data = {
            name: values.name,
            colorId: selectedColor._id,
        };
        dispatch(runAddCategory(data, handleClose));
    };
    return (
        <Formik initialValues={initialValues} validationSchema={AddClientSchema} onSubmit={handlerAddCategory}>
            {({ dirty, isValid, errors }) => (
                <Form className="form">
                    <h2 className="form__title">Добавить категорию</h2>
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
                                disabled={isAdding}
                                title={"Цвет категории"}
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button color="primary" type="submit" disabled={!dirty || !isValid || isAdding}>
                            Добавить
                        </Button>
                        <Button onClick={handleClose} color="primary" disabled={isAdding}>
                            Отмена
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default FormAddCategory;
