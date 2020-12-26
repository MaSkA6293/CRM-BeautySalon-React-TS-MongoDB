import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useDispatch } from "react-redux";
import { IColor } from "../../../../ducks/colors/contracts/state";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SelectColor from "../../../../components/SelectColor";
import { myNewEvent } from "../../../../ducks/calendar/contracts/types";
import { runAddNewEvent } from "../../../../ducks/calendar/actionCreators/addNewEvent";
import { validationEventSchema } from "../../../../ducks/calendar/validations/event";
export interface IFormicAddEvent {
    newEvent: myNewEvent | undefined;
    closeModal: () => void;
    colors: IColor[];
    isAdding: boolean;
}
type initialValues = {
    title: string;
    start: string;
    end: string;
};
const FormicAddEvent: React.FC<IFormicAddEvent> = ({
    newEvent,
    closeModal,
    colors,
    isAdding,
}: IFormicAddEvent): React.ReactElement => {
    const [selectedColor, setSelectedColor] = useState<IColor>(colors[0]);

    const initialValues: initialValues = {
        title: "",
        start: newEvent?.start ? newEvent.start : "00:00",
        end: newEvent?.end ? newEvent.end : "00:00",
    };
    const dispatch = useDispatch();

    const handlerSubmit = (values: initialValues) => {
        dispatch(
            runAddNewEvent(
                {
                    ...newEvent,
                    title: values.title,
                    start: values.start,
                    end: values.end,
                    allDay: checked,
                    color: selectedColor.hex,
                },
                closeModal,
            ),
        );
    };
    const [checked, setChecked] = useState<boolean>(false);
    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationEventSchema}
            onSubmit={(values: initialValues) => handlerSubmit(values)}
        >
            {({ dirty, isValid, errors }) => (
                <Form className="form">
                    <div className="form__title-btn-delet">
                        <h2 className="form__title">Добавить событие</h2>
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
                                    type="title"
                                    name="title"
                                    fullWidth
                                    error={errors.title ? true : false}
                                    autoComplete="false"
                                    className="form__item"
                                    disabled={isAdding}
                                />
                            </div>
                        </div>
                        <div className="field__error">
                            <FormHelperText id="component-error-text">{errors.title}</FormHelperText>
                        </div>

                        <div className="form__field field field-margin-bottom ">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <AccessTimeIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Время начала"
                                        type="time"
                                        name="start"
                                        error={errors.start ? true : false}
                                        fullWidth
                                        autoComplete="false"
                                        className="form__item"
                                        disabled={isAdding}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field__error">
                            <FormHelperText id="component-error-text">{errors.start}</FormHelperText>
                        </div>
                        <div className="form__field field field-margin-bottom ">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <AccessTimeIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Время окончания"
                                        type="time"
                                        name="end"
                                        fullWidth
                                        error={errors.end ? true : false}
                                        autoComplete="false"
                                        className="form__item"
                                        disabled={isAdding}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field__error">
                            <FormHelperText id="component-error-text">{errors.end}</FormHelperText>
                        </div>

                        <div className="form__field field field-margin-bottom ">
                            <div className="field__row">
                                <div className="field__body fieldCheckbox">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                style={{ color: "green" }}
                                                className={"fieldCheckbox__checkBox"}
                                                checked={checked}
                                                onChange={handleChangeCheckBox}
                                                disabled={isAdding}
                                            />
                                        }
                                        label="Весь день"
                                    />
                                </div>
                            </div>
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
                                title={"Цвет события"}
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button color="primary" type="submit" name="edit" disabled={!isValid || isAdding || !dirty}>
                            {isAdding ? "Сохренение..." : "Сохранить"}
                        </Button>
                        <Button
                            onClick={closeModal}
                            color="primary"
                            name="delet"
                            type="button"
                            disabled={!isValid || isAdding}
                        >
                            Отмена
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default FormicAddEvent;
