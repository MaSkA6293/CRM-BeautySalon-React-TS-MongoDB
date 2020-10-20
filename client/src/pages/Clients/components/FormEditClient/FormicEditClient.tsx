import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import PhoneInput from "../ModalAddClient/PhoneInput";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import RecentActorsIcon from "@material-ui/icons/RecentActors";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";

import AreYouSure from "../../../../components/AreYouSure";
import { IClientValues } from "../../../../types/typesClients";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
const hendlerPhoneValue = (value: string) => {
  const checkValue = value.replace(/[+?,(,),\s?,\-,_]+/g, "").trim();
  return checkValue.length === 11 ? true : false;
};
const EditClientSchema = Yup.object().shape({
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
    surname: currentClient.surname,
    phone: currentClient.phone,
  };
  const [open, setOpen] = useState(false);

  const handlerDelet = () => {
    //dispatch(rundDeletService(selectedServic._id, handleClose));
  };

  return (
    <>
      <AreYouSure
        open={open}
        setOpen={setOpen}
        handlerDelet={handlerDelet}
        text={"Вы действительно хотите удалить клиента?"}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditClientSchema}
        onSubmit={(values) => {
          console.log(values)
          // isDelet
          //   ? deletClient(currentClient._id)
          //   : editClient(values, currentClient._id);
        }}
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
                <div className="field__error"></div>
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
              >
                {clientIsEditing ? "Сохренение..." : "Сохранить"}
              </Button>
              <Button
                onClick={closeModal}
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

export default FormicEditClient;
