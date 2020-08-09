import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ICategoryValues } from "../../types";

import IconButton from "@material-ui/core/IconButton";
const initialValues: ICategoryValues = {
  name: "",
  comment: "",
  color: "black",
};

const AddCategorySchema = Yup.object().shape({
  name: Yup.string().min(4, "Минимум 4 символа").required("Обязательное поле"),
  coment: Yup.string(),
});

type FormicAddCategory = {
  handlerAddCategory: (values: ICategoryValues) => void;
  categoryIsAdded: boolean;
  categoryAddIsFail: boolean;
  categoryAdded: boolean;
  closeModal: () => void;
};

const FormicAddCategory = ({
  handlerAddCategory,
  categoryIsAdded,
  categoryAddIsFail,
  categoryAdded,
  closeModal,
}: FormicAddCategory) => {
  return (
    <>
      <h3 className="Modal__title">Добавить новую категорию</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={AddCategorySchema}
        onSubmit={handlerAddCategory}
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
              label="Комментарий"
              type="comment"
              name="comment"
              fullWidth
              error={errors.comment ? true : false}
              autoComplete="false"
              className="Form__item"
            />
            <FormHelperText id="component-error-text">
              {errors.comment}
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                !isValid ||
                !dirty ||
                categoryIsAdded ||
                categoryAddIsFail ||
                categoryAdded
              }
              className={"Form__submit"}
            >
              {categoryIsAdded ? "Добавление клиента..." : "Добавить клиента"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormicAddCategory;
