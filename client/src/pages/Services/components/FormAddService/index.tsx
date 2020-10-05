import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import "./styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import cogoToast from "cogo-toast";

import DialogActions from "@material-ui/core/DialogActions";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import SelectColor from "./SelectColor";

import SettingsIcon from "@material-ui/icons/Settings";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { addService } from "../../actions/actionsServices";
import { ICategory } from "../../types";

export const getTime = (time: string) => {
  return time.split(":").map((el) => parseInt(el.replace(/^0(\d)/, "$1")));
};

const initialValues = {
  name: "",
  time: "01:00",
  price: "",
};
const AddClientSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  price: Yup.string().required("Обязательное поле"),
});

type FormAddServiceProps = {
  handleClose: any;
  categoryList: ICategory[];
};

const FormAddService = ({ handleClose, categoryList }: FormAddServiceProps) => {
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
  const [category, setCategory] = useState<string[]>([]);
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
    time: string;
    price: string;
  }
  const handlerAddService = (values: AddServise) => {
    const data = {
      name: values.name,
      duration: getTime(values.time),
      cost: parseInt(values.price),
      colorId: selectedColor,
      categoriesId: category,
    };
    dispatch(addService(data, handleClose));
  };

  const names = [
    { name: "Стрижка", _id: "1", colorId: "red" },
    { name: "Окрашивание", _id: "2", colorId: "green" },
    { name: "Укладка", _id: "3", colorId: "blue" },
  ];

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string[]);
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
            <h2 className="form__title">Добавить услугу</h2>
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

            <div className="form__field field field-marginBottom ">
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
                    className="form__item"
                  />
                </div>
              </div>
            </div>

            <div className="form__field field">
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
                    className="form__item"
                  />
                </div>
              </div>
              <div className="field__error">
                <FormHelperText id="component-error-text">
                  {errors.price}
                </FormHelperText>
              </div>
            </div>

            <div className="form__field field">
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
                      value={category}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={(selected: any) =>
                        selected
                          .map((_id: string) => {
                            return categoryList.find(
                              (el) => el._id.toString() === _id
                            )?.name;
                          })
                          .join(", ")
                      }
                    >
                      {categoryList.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item._id.toString()}
                          style={{ backgroundColor: item.colorId }}
                        >
                          <Checkbox
                            checked={category.indexOf(item._id.toString()) > -1}
                          />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
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

export default FormAddService;
