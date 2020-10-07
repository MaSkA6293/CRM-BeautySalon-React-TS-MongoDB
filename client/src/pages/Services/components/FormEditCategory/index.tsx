import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import "./styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import cogoToast from "cogo-toast";

import DialogActions from "@material-ui/core/DialogActions";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import SelectColor from "./SelectColor";

import { editCategory, deletCategory } from "../../actions/actionsServices";

import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import AreYouSure from "../AreYouSure";
import { IColor } from "../../../../types/typesColors";

const EditCategorySchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
});

type FormEditCategoryProps = {
  handleClose: () => void;
  categoryList: {
    _id: string;
    name: string;
    color: IColor;
  }[];
  selectedCategory: { _id: string; name: string; color: IColor };
};

const FormEditCategory = ({
  handleClose,
  selectedCategory,
  categoryList,
}: FormEditCategoryProps) => {
  const {
    colors,
    serviceMessageFail,
    serviceMessageSuccess,
    serviceIsEdited,
  } = useSelector(({ colors, services }: IGlobalStore) => {
    return {
      colors: colors.colorsList,
      serviceMessageFail: services.serviceMessageFail,
      serviceMessageSuccess: services.serviceMessageSuccess,
      serviceIsEdited: services.serviceIsEdited,
    };
  });
  const initialValues = {
    name: selectedCategory.name,
  };
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(selectedCategory.color);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    serviceMessageFail &&
      cogoToast.error(<div className="message">{serviceMessageFail}</div>);
  }, [serviceMessageFail]);

  useEffect(() => {
    serviceMessageSuccess &&
      cogoToast.success(<div className="message">{serviceMessageSuccess}</div>);
  }, [serviceMessageSuccess]);

  interface EditCategory {
    name: string;
  }
  const handlerEditCategory = (values: EditCategory) => {
    const data = {
      _id: selectedCategory._id,
      name: values.name,
      colorId: selectedColor._id,
    };
    dispatch(editCategory(data, handleClose));
  };

  const handlerDelet = () => {
    dispatch(deletCategory(selectedCategory._id, handleClose));
  };
  return (
    <>
      <AreYouSure
        open={open}
        setOpen={setOpen}
        handlerDelet={handlerDelet}
        text={"Вы действительно хотите удалить категорию?"}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditCategorySchema}
        onSubmit={handlerEditCategory}
      >
        {({ isValid, errors }) => (
          <Form className="form">
            <div className="form__title-btn-delet">
              <h2 className="form__title">Редактировать</h2>
              <Button disabled={serviceIsEdited} onClick={() => setOpen(true)}>
                <DeleteSweepIcon />
              </Button>
            </div>
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
                    ? selectedColor.hex
                    : "#4791db",
                }}
              ></div>
              <div className="selectColor__button">
                <SelectColor
                  setSelectedColor={setSelectedColor}
                  colors={colors}
                  serviceIsEdited={serviceIsEdited}
                />
              </div>
            </div>
            <DialogActions>
              <Button
                color="primary"
                type="submit"
                disabled={!isValid || serviceIsEdited}
              >
                Сохранить
              </Button>
              <Button
                onClick={handleClose}
                color="primary"
                disabled={serviceIsEdited}
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

export default FormEditCategory;
