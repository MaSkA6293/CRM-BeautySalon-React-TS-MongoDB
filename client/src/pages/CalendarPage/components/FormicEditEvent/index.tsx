import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { AreYouSure } from "../../../../components/AreYouSure";

import { useDispatch } from "react-redux";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import moment from "moment-business-days";
import { validationEventSchema } from "../../../../ducks/calendar/validations/event";
import SelectColor from "../../../../components/SelectColor";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { IColor } from "../../../../ducks/colors/contracts/state";
import { IEvent } from "../../../../ducks/calendar/contracts/state";
import { runEditEvent } from "../../../../ducks/calendar/actionCreators/editEvent";
import { runDeletEvent } from "../../../../ducks/calendar/actionCreators/deletEvent";

import { IClient } from "../../../../ducks/clients/contracts/state";
import PersonIcon from "@material-ui/icons/Person";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";

interface IFormicEditEvent {
    currentEvent: IEvent;
    isDeleting: boolean;
    isEditing: boolean;
    closeModal: () => void;
    colors: IColor[];
    clients: IClient[];
}

const FormicEditEvent: React.FC<IFormicEditEvent> = ({
    currentEvent,
    isDeleting,
    isEditing,
    closeModal,
    colors,
    clients,
}: IFormicEditEvent): React.ReactElement => {
    type initialValuesProps = {
        title: string;
        start: string;
        end: string;
        client: string;
    };
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState<boolean>(currentEvent === undefined ? false : currentEvent.allDay);
    const [selectedColor, setSelectedColor] = useState(colors.find((el) => el.hex === currentEvent.color));
    const [clientId, setClientId] = useState<string>(
        currentEvent.clientId === "new" || undefined ? "" : currentEvent.clientId,
    );
    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const handlerDelet = () => {
        dispatch(runDeletEvent(currentEvent._id, closeModal));
    };
    const dispatch = useDispatch();
    const initialValues: initialValuesProps = {
        title: currentEvent.title,
        start: moment(currentEvent.start).format("HH:mm"),
        end: moment(currentEvent.end).format("HH:mm"),
        client: clientId,
    };
    const handlerSubmit = (values: initialValuesProps) => {
        dispatch(
            runEditEvent(
                {
                    ...currentEvent,
                    title: values.title,
                    start: values.start,
                    end: values.end,
                    color: selectedColor?.hex === undefined ? "red" : selectedColor?.hex,
                    allDay: checked,
                    clientId: clientId,
                },
                closeModal,
            ),
        );
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setClientId(event.target.value as string);
    };

    return (
        <>
            <AreYouSure
                open={open}
                setOpen={setOpen}
                handlerDelet={handlerDelet}
                text={"Вы действительно хотите удалить событие?"}
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationEventSchema}
                onSubmit={(values: initialValuesProps) => handlerSubmit(values)}
            >
                {({ dirty, isValid, errors }) => (
                    <Form className="form">
                        <div className="form__title-btn-delet">
                            <h2 className="form__title">Редактировать</h2>
                            <Button onClick={() => setOpen(true)}>
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
                                        type="title"
                                        name="title"
                                        fullWidth
                                        error={errors.title ? true : false}
                                        autoComplete="false"
                                        className="form__item"
                                        disabled={isDeleting || isEditing}
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
                                        <PersonIcon />{" "}
                                    </div>
                                    <div className="field__body">
                                        <FormControl>
                                            <InputLabel id="demo-mutiple-checkbox-label">Клиент</InputLabel>
                                            <Select
                                                disabled={isEditing}
                                                labelId="demo-mutiple-checkbox-label"
                                                id="demo-mutiple-checkbox"
                                                value={clientId}
                                                onChange={handleChange}
                                                input={<Input />}
                                                name="client"
                                            >
                                                {clients.map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={item._id}
                                                        style={{ backgroundColor: "white" }}
                                                    >
                                                        <ListItemText primary={item.name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="field__error">
                                <FormHelperText id="component-error-text">{errors.client}</FormHelperText>
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
                                            fullWidth
                                            error={errors.start ? true : false}
                                            autoComplete="false"
                                            className="form__item"
                                            disabled={isDeleting || isEditing}
                                        />
                                    </div>
                                </div>
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
                                            disabled={isDeleting || isEditing}
                                        />
                                    </div>
                                </div>
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
                                                    disabled={isEditing || isDeleting}
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
                                    backgroundColor: selectedColor?.hex,
                                }}
                            ></div>
                            <div className="select-color__button">
                                <SelectColor
                                    setSelectedColor={setSelectedColor}
                                    colors={colors}
                                    disabled={isEditing || isDeleting}
                                    title={"Цвет события"}
                                />
                            </div>
                        </div>
                        <DialogActions>
                            <Button
                                color="primary"
                                type="submit"
                                name="edit"
                                disabled={!isValid || isDeleting || isEditing}
                            >
                                {isEditing ? "Сохренение..." : "Сохранить"}
                            </Button>
                            <Button
                                onClick={closeModal}
                                color="primary"
                                name="delet"
                                type="button"
                                disabled={!isValid || isDeleting || isEditing}
                            >
                                Отмена
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormicEditEvent;
