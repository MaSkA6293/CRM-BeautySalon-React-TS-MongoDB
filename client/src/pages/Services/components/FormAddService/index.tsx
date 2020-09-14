import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import "./styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector } from "react-redux";

import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import SelectColor from "../SelectColor";

import SettingsIcon from "@material-ui/icons/Settings";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const initialValues = {
  name: "",
  time: "01:00",
  price: "",
};
const AddClientSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  price: Yup.string().required("Обязательное поле"),
});
const FormAddService = ({ handleClose }: any) => {
  const { colors } = useSelector(({ colors }: IGlobalStore) => {
    return {
      colors: colors.colorsList,
    };
  });

  const [selectedColor, setSelectedColor] = useState("#4791db");

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handlerAddService = (values: any) => {
    console.log(values, selectedColor, personName);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddClientSchema}
        onSubmit={handlerAddService}
      >
        {({ dirty, isValid, errors }) => (
          <Form className="Form">
            <div className="Form__field field">
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
                    className="Form__item"
                  />
                </div>
              </div>
              <div className="field__error">
                <FormHelperText id="component-error-text">
                  {errors.name}
                </FormHelperText>
              </div>
            </div>

            <div className="Form__field field field-marginBottom ">
              <div className="field__row">
                <div className="field__icon">
                  {" "}
                  <AccessTimeIcon />{" "}
                </div>
                <div className="field__body">
                  <Field
                    as={TextField}
                    label="Длительность"
                    type="time"
                    name="time"
                    fullWidth
                    error={errors.time ? true : false}
                    autoComplete="false"
                    className="Form__item"
                  />
                </div>
              </div>
            </div>

            <div className="Form__field field">
              <div className="field__row">
                <div className="field__icon">
                  {" "}
                  <LocalAtmIcon />{" "}
                </div>
                <div className="field__body">
                  <Field
                    as={TextField}
                    label="Цена"
                    type="number"
                    name="price"
                    fullWidth
                    error={errors.price ? true : false}
                    autoComplete="false"
                    className="Form__item"
                  />
                </div>
              </div>
              <div className="field__error">
                <FormHelperText id="component-error-text">
                  {errors.price}
                </FormHelperText>
              </div>
            </div>

            <div className="Form__field field">
              <div className="field__row">
                <div className="field__icon ">
                  {" "}
                  <SettingsIcon />{" "}
                </div>
                <div className="field__body  field__body-sizeSelect">
                  <FormControl>
                    <InputLabel id="demo-mutiple-checkbox-label">
                      Категории
                    </InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={(selected: any) =>
                        (selected as string[]).join(", ")
                      }
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="Form__selectColor selectColor">
              <div
                className="selectColor__selected"
                style={{
                  backgroundColor: selectedColor,
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

export default FormAddService;
