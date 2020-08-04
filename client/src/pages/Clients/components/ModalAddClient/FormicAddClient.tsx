import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import PhoneInput from "./PhoneInput";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { IClientValues } from "../../../../types/typesClients";

import IconButton from "@material-ui/core/IconButton";
const initialValues: IClientValues = {
  name: "",
  female: "",
  phone: "",
};
const hendlerPhoneValue = (value: string) => {
  const checkValue = value.replace(/[+?,(,),\s?,\-,_]+/g, "").trim();
  return checkValue.length === 11 ? true : false;
};
const AddClientSchema = Yup.object().shape({
  name: Yup.string().min(4, "Минимум 4 символа").required("Обязательное поле"),
  female: Yup.string()
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
  clientAddIsFail: boolean;
  clientAdded: boolean;
  closeModal: () => void;
};

const FormicAddClient = ({
  handlerAddClient,
  clientIsAdded,
  clientAddIsFail,
  clientAdded,
  closeModal,
}: FormicAddClientProps) => {
  return (
    <>
      <h3 className="Modal__title">Добавить нового клиента</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={AddClientSchema}
        onSubmit={handlerAddClient}
      >
        {({ dirty, isValid, errors }) => (
          <Form className="Form">
            <IconButton onClick={closeModal} className="Form__close">
              <CloseIcon fontSize="small" />
            </IconButton>
            <Field
              as={TextField}
              label="Имя"
              type="name"
              name="name"
              fullWidth
              error={errors.name ? true : false}
              autoComplete="false"
              className="Form__item"
            />
            <FormHelperText id="component-error-text">
              {errors.name}
            </FormHelperText>
            <Field
              as={TextField}
              label="Фамилия"
              type="female"
              name="female"
              fullWidth
              error={errors.female ? true : false}
              autoComplete="false"
              className="Form__item"
            />
            <FormHelperText id="component-error-text">
              {errors.female}
            </FormHelperText>
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
              className="Form__item"
            />{" "}
            <FormHelperText id="component-error-text">
              {errors.phone}
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                !isValid ||
                !dirty ||
                clientIsAdded ||
                clientAddIsFail ||
                clientAdded
              }
              className={"Form__submit"}
            >
              {clientIsAdded ? "Добавление клиента..." : "Добавить клиента"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormicAddClient;
