import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import PhoneInput from "./PhoneInput";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { IClientValues } from "../../../../types/typesClients";

import DialogActions from "@material-ui/core/DialogActions";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";

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
  surname: Yup.string()
    .min(4, "Минимум 4 символа")
    .required("Обязательное поле"),
  phone: Yup.string().test("test-phone", "Не корректное значение", function (
    value
  ) {
    if (value) {
      return hendlerPhoneValue(value);
    }
    return false;
  }),
});

type FormicAddClientProps = {
  handlerAddClient: (values: IClientValues) => void;
  clientIsAdded: boolean;
  closeModal: () => void;
};

const FormicAddClient = ({
  handlerAddClient,
  clientIsAdded,
  closeModal
}: FormicAddClientProps) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddClientSchema}
        onSubmit={handlerAddClient}
      >
        {({ dirty, isValid, errors }) => (
          <Form className="form">
            <h2 className="form__title">Добавить клиента</h2>
            <div className="form__field field">
              <div className="field__row">
                <div className="field__icon">
                  {" "}
                  <RecentActorsIcon />{" "}
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
                <FormHelperText id="component-error-text">
                  {errors.name}
                </FormHelperText>
              </div>
            </div>
            <div className="form__field field">
              <div className="field__row">
                <div className="field__icon">
                  {" "}
                  <RecentActorsIcon />{" "}
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
                <FormHelperText id="component-error-text">
                  {errors.surname}
                </FormHelperText>
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
                <FormHelperText id="component-error-text">
                  {errors.phone}
                </FormHelperText>
              </div>
            </div>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !isValid ||
                  !dirty ||
                  clientIsAdded
                }
                className={"form__submit"}
              >
                {clientIsAdded ? "Добавление..." : "Добавить"}
              </Button>
              <Button
                onClick={closeModal}
                color="primary"
                disabled={clientIsAdded}
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

export default FormicAddClient;
