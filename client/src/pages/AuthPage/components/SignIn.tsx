import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useHistory } from "react-router-dom";

const AddClientSchema = Yup.object().shape({
  email: Yup.string().email("Не корректное значение")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Обязательное поле"),
});
type AuthFormProps = {
  userIsLogining: boolean;
  signIn: (values: InitialValues) => void;
};
interface InitialValues {
  email: string,
  password: string,
}

const AuthForm: React.FC<AuthFormProps> = ({
  signIn,
  userIsLogining,
}: AuthFormProps): React.ReactElement => {

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (data: InitialValues) => {
    signIn(data);
  }
  const history = useHistory()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddClientSchema}
      onSubmit={(values: InitialValues) => handleSubmit(values)}
    >
      {({ errors }) => (
        < Form className="auth__form form">
          <Field
            as={TextField}
            label="Email"
            type="email"
            name="email"
            fullWidth
            error={errors.email ? true : false}
            autoComplete="false"
            className="form__item"
            disabled={userIsLogining}
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
            disabled={userIsLogining}
          />
          <FormHelperText id="component-error-text">
            {errors.password}
          </FormHelperText>

          <div className="form__submit">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={userIsLogining}
            >
              Войти
            </Button>
          </div>

          <div className="form__submit">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={userIsLogining}
              onClick={history.goBack}
            >
              Назад
              </Button>
          </div>
        </Form>
      )}
    </Formik >
  );
};

export default AuthForm;
