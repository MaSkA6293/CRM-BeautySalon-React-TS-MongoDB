import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { AreYouSure } from "../../../../components/AreYouSure";

import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import PersonIcon from "@material-ui/icons/Person";
import moment from "moment-business-days";

const EditEventSchema = Yup.object().shape({
    title: Yup.string().min(4, "Минимум 4 символа").required("Обязательное поле"),
});

interface IFormicEditEvent {
    editEvent: (values: any) => void;
    deletEvent: (id: number) => void;
    currentEvent: any;
    eventIsDeleting: boolean;
    eventIsEditing: boolean;
    closeModal: () => void;
}

const FormicEditEvent: React.FC<IFormicEditEvent> = ({
    editEvent,
    deletEvent,
    currentEvent,
    eventIsDeleting,
    eventIsEditing,
    closeModal,
}: IFormicEditEvent): React.ReactElement => {
    const initialValues: any = {
        title: currentEvent.title,
        start: moment(currentEvent.start).format("HH:MM"),
        end: moment(currentEvent.end).format("HH:MM"),
    };
    const [open, setOpen] = useState(false);

    const handlerDelet = () => {
        console.log("submit", currentEvent);
        //  deletEvent(currentEvent._id);
    };
    const handlerSubmit = (values: any) => {
        console.log("submit", values);
        //  editEvent({ ...currentEvent, title: values.title, start: values.start, end: values.end });
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
                validationSchema={EditEventSchema}
                onSubmit={(values: any) => handlerSubmit(values)}
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
                                    <PersonIcon />{" "}
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
                                            fullWidth
                                            error={errors.time ? true : false}
                                            autoComplete="false"
                                            className="form__item"
                                            //  disabled={isAdding}
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
                                            error={errors.time ? true : false}
                                            autoComplete="false"
                                            className="form__item"
                                            //  disabled={isAdding}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogActions>
                            <Button
                                color="primary"
                                type="submit"
                                name="edit"
                                disabled={!isValid || eventIsDeleting || eventIsEditing}
                            >
                                {eventIsEditing ? "Сохренение..." : "Сохранить"}
                            </Button>
                            <Button
                                onClick={closeModal}
                                color="primary"
                                name="delet"
                                type="button"
                                disabled={!isValid || eventIsDeleting || eventIsEditing}
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
