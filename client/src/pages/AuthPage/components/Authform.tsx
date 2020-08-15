import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";

const AddClientSchema = Yup.object().shape({
  email: Yup.string()
    .email("Не корректное значение")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
});
type AuthFormProps = {
  userIsLoading: boolean;
  userIsLogining: boolean;
  signIn: (values: { email: string; password: string }) => void;
  signUp: (values: { email: string; password: string }) => void;
};

const AuthForm = ({
  userIsLoading,
  signIn,
  signUp,
  userIsLogining,
}: AuthFormProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any) => {
    if (isRegister) {
      signUp(values);
      setIsRegister((prev) => !prev);
    } else {
      signIn(values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddClientSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors }) => (
        <Form className="Auth__Form Form">
          <Field
            as={TextField}
            label="Email"
            type="email"
            name="email"
            fullWidth
            error={errors.email ? true : false}
            autoComplete="false"
            className="Form__item"
          />
          <FormHelperText id="component-error-text">
            {errors.email}
          </FormHelperText>
          <Field
            as={TextField}
            label="Пароль"
            type="password"
            name="password"
            fullWidth
            error={errors.password ? true : false}
            autoComplete="false"
            className="Form__item"
          />
          <FormHelperText id="component-error-text">
            {errors.password}
          </FormHelperText>
          <div className="Form__submit">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={userIsLoading || userIsLogining}
              className={"Form__signUp"}
            >
              Войти
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={userIsLoading || userIsLogining}
              onClick={() => {
                setIsRegister((prev) => !prev);
              }}
            >
              Регистрация
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
