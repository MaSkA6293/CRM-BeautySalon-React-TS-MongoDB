import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useHistory } from "react-router-dom";
const AddClientSchema = Yup.object().shape({
  email: Yup.string()
    .email("Не корректное значение")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Пароли должны совпадать')

});
type AuthFormProps = {
  userIsLoading: boolean;
  signUp: (data: initialValues) => void;
};
interface initialValues {
  email: string,
  password: string,
  confirmPassword: string
}

const AuthForm: React.FC<AuthFormProps> = ({ userIsLoading, signUp, }: AuthFormProps): React.ReactElement => {
  const initialValues: initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (data: initialValues) => {
    signUp(data);
  };
  const history = useHistory()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddClientSchema}
      onSubmit={(values: initialValues) => handleSubmit(values)}
    >
      {({ errors }) => (
        <Form className="auth__form form">
          <Field
            as={TextField}
            label="Email"
            type="email"
            name="email"
            fullWidth
            error={errors.email ? true : false}
            autoComplete="false"
            className="form__item"
            disabled={userIsLoading}
          />
          <FormHelperText id="component-error-text">{errors.email}</FormHelperText>
          <Field
            as={TextField}
            label="Пароль"
            type="password"
            name="password"
            fullWidth
            error={errors.password ? true : false}
            autoComplete="false"
            className="form__item"
            disabled={userIsLoading}
          />
          <FormHelperText id="component-error-text">
            {errors.password}
          </FormHelperText>
          <Field
            as={TextField}
            label="Подтвердить пароль"
            type="password"
            name="confirmPassword"
            fullWidth
            error={errors.confirmPassword ? true : false}
            autoComplete="false"
            className="form__item"
            disabled={userIsLoading}
          />
          <FormHelperText id="component-error-text">
            {errors.confirmPassword}
          </FormHelperText>

          <div className="form__submit">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={userIsLoading}
              className={"form__signUp"}
            >
              Регистрация
            </Button>
          </div>
          <div className="form__submit">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={userIsLoading}
              onClick={history.goBack}
            >
              Назад
           </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
