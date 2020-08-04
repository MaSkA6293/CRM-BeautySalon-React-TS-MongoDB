import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import PhoneInput from "../ModalAddClient/PhoneInput";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { IClientValues } from "../../../../types/typesClients";

const hendlerPhoneValue = (value: string) => {
  const checkValue = value.replace(/[+?,(,),\s?,\-,_]+/g, "").trim();
  return checkValue.length === 11 ? true : false;
};
const EditClientSchema = Yup.object().shape({
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

type FormicEditClientProps = {
  editClient: (values: IClientValues, id: number) => void;
  deletClient: (id: number) => void;
  currentClient: any;
  clientDeleted: boolean;
  clientIsDeleting: boolean;
  clientEdited: boolean;
  clientIsEditing: boolean;
  clientEditIsFail: boolean;
  clientDeletIsFail: boolean;
  closeModal: () => void;
};

const FormicEditClient = ({
  editClient,
  deletClient,
  currentClient,
  clientDeleted,
  clientIsDeleting,
  clientEdited,
  clientIsEditing,
  clientEditIsFail,
  clientDeletIsFail,
  closeModal,
}: FormicEditClientProps) => {
  const initialValues: IClientValues = {
    name: currentClient.name,
    female: currentClient.female,
    phone: currentClient.phone,
  };

  const [isDelet, setIsDelet] = useState(false);

  return (
    <>
      <h2 className="Modal__title">Изменить данные клиента</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={EditClientSchema}
        onSubmit={(values) => {
          isDelet
            ? deletClient(currentClient._id)
            : editClient(values, currentClient._id);
        }}
      >
        {({ dirty, isValid, errors, handleSubmit }) => (
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
              name="edit"
              disabled={
                !isValid ||
                !dirty ||
                clientDeleted ||
                clientIsDeleting ||
                clientEdited ||
                clientIsEditing ||
                clientEditIsFail ||
                clientDeletIsFail
              }
              className={"Form__submit"}
            >
              {clientIsEditing ? "Сохренение изменений" : "Сохранить изменения"}
            </Button>
            <Button
              onClick={() => {
                setIsDelet((prev) => !prev);
                handleSubmit();
              }}
              variant="contained"
              color="primary"
              name="delet"
              type="button"
              disabled={
                !isValid ||
                clientDeleted ||
                clientIsDeleting ||
                clientEdited ||
                clientIsEditing ||
                clientEditIsFail ||
                clientDeletIsFail
              }
              className={"Form__submit"}
            >
              {clientIsDeleting ? "Удаление клиента" : "Удалить клиента"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormicEditClient;
