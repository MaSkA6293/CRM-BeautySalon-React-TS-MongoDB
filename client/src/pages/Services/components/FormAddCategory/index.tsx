import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

import "./styles.scss";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import cogoToast from "cogo-toast";

import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import SelectColor from "./SelectColor";
import { runAddCategory } from "../../../../sagas/pageCategories/addCategory";

const initialValues = {
  name: "",
};
const AddClientSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
});

type FormAddCategoryProps = {
  handleClose: () => void;
};

const FormAddCategory = ({ handleClose }: FormAddCategoryProps) => {
  const { colors, serviceMessageFail, serviceMessageSuccess } = useSelector(
    ({ colors, services }: IGlobalStore) => {
      return {
        colors: colors.colorsList,
        serviceMessageFail: services.serviceMessageFail,
        serviceMessageSuccess: services.serviceMessageSuccess,
      };
    }
  );
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]._id.toString());
    }
  }, [colors]);

  useEffect(() => {
    serviceMessageFail &&
      cogoToast.error(<div className="message">{serviceMessageFail}</div>);
  }, [serviceMessageFail]);

  useEffect(() => {
    serviceMessageSuccess &&
      cogoToast.success(<div className="message">{serviceMessageSuccess}</div>);
  }, [serviceMessageSuccess]);

  interface AddServise {
    name: string;
  }
  const handlerAddService = (values: AddServise) => {
    const data = {
      name: values.name,
      colorId: selectedColor,
    };
    dispatch(runAddCategory(data, handleClose));
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddClientSchema}
        onSubmit={handlerAddService}
      >
        {({ dirty, isValid, errors }) => (
          <Form className="form">
            <h2 className="form__title">Добавить категорию</h2>
            <div className="form__field field">
              <div className="field__row">
                <div className="field__icon">
                  {" "}
                  <TextFieldsIcon />{" "}
                </div>
                <div className="field__body">
                  <Field
                    as={TextField}
                    label="Название"
                    type="text"
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
            <div className="form__selectColor selectColor">
              <div
                className="selectColor__selected selectColor__selected-marginRight "
                style={{
                  backgroundColor: selectedColor
                    ? colors.find((c) => c._id.toString() === selectedColor)
                        ?.hex
                    : "#4791db",
                }}
              ></div>
              <div className="selectColor__button">
                <SelectColor
                  setSelectedColor={setSelectedColor}
                  colors={colors}
                />
              </div>
            </div>
            <DialogActions>
              <Button
                color="primary"
                type="submit"
                disabled={!dirty || !isValid}
              >
                Добавить
              </Button>
              <Button onClick={handleClose} color="primary">
                Отмена
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAddCategory;
