import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import PhoneInput from "./PhoneInput";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { IClientValues } from "../../../../ducks/clients/contracts/state";

import DialogActions from "@material-ui/core/DialogActions";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonIcon from "@material-ui/icons/Person";
const initialValues: IClientValues = {
    name: "",
    surname: "",
    phone: "",
};
const hendlerPhoneValue = (value: string) => {
    const checkValue = value.replace(/[+?,(,),\s?,\-,_]+/g, "").trim();
    return checkValue.length === 11 ? true : false;
};
const AddClientSchema = Yup.object().shape({
    name: Yup.string().min(4, "Минимум 4 символа").required("Обязательное поле"),
    surname: Yup.string().min(4, "Минимум 4 символа").required("Обязательное поле"),
    phone: Yup.string().test("test-phone", "Не корректное значение", function (value) {
        if (value) {
            return hendlerPhoneValue(value);
        }
        return false;
    }),
});

interface IFormicAddClient {
    handlerAddClient: (values: IClientValues) => void;
    clientIsAdding: boolean;
    closeModal: () => void;
}

const FormicAddClient: React.FC<IFormicAddClient> = ({
    handlerAddClient,
    clientIsAdding,
    closeModal,
}: IFormicAddClient): React.ReactElement => {
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={AddClientSchema} onSubmit={handlerAddClient}>
                {({ dirty, isValid, errors }) => (
                    <Form className="form">
                        <h2 className="form__title">Добавить клиента</h2>
                        <div className="form__field field">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <PersonIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Имя"
                                        type="name"
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
                        <div className="form__field field">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <AccountBoxIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Фамилия"
                                        type="surname"
                                        name="surname"
                                        fullWidth
                                        error={errors.surname ? true : false}
                                        autoComplete="false"
                                        className="form__item"
                                    />
                                </div>
                            </div>
                            <div className="field__error">
                                <FormHelperText id="component-error-text">{errors.surname}</FormHelperText>
                            </div>
                        </div>
                        <div className="form__field field">
                            <div className="field__row">
                                <div className="field__icon">
                                    {" "}
                                    <PermPhoneMsgIcon />{" "}
                                </div>
                                <div className="field__body">
                                    <Field
                                        as={TextField}
                                        label="Телефон"
                                        type="phone"
                                        name="phone"
                                        fullWidth
                                        InputProps={{
                                            inputComponent: PhoneInput as any,
                                        }}
                                        error={errors.phone ? true : false}
                                        autoComplete="false"
                                        className="form__item"
                                    />{" "}
                                </div>
                            </div>
                            <div className="field__error">
                                <FormHelperText id="component-error-text">{errors.phone}</FormHelperText>
                            </div>
                        </div>
                        <DialogActions>
                            <Button
                                color="primary"
                                type="submit"
                                disabled={!isValid || !dirty || clientIsAdding}
                                className={"form__submit"}
                            >
                                {clientIsAdding ? "Добавление..." : "Добавить"}
                            </Button>
                            <Button onClick={closeModal} color="primary" disabled={clientIsAdding}>
                                Отмена
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormicAddClient;
