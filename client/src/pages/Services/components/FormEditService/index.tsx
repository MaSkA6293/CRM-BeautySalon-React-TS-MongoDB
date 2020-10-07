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

import { editService, deletServic } from "../../actions/actionsServices";

import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import AreYouSure from "../AreYouSure";
import { ICategory } from "../../types";

export const getTimeFromArray = (time: number[]) => {
  return time
    .map((el) => {
      if (el.toString().length === 1) {
        return `0${el}`;
      } else return el;
    })
    .join(":");
};
export const getTimeToArray = (time: string) => {
  return time.split(":").map((el) => parseInt(el.replace(/^0(\d)/, "$1")));
};
const AddClientSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  price: Yup.string().required("Обязательное поле"),
});

type FormEditServiceProps = {
  categoryList: ICategory[];
  handleClose: () => void;
  selectedServic: {
    _id: string;
    name: string;
    duration: number[];
    cost: number;
    color: { _id: string; hex: string };
    categoryColor: string[];
    categoriesId: string[];
  };
};

const FormEditService = ({
  handleClose,
  selectedServic,
  categoryList,
}: FormEditServiceProps) => {
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
    name: selectedServic.name,
    time: getTimeFromArray(selectedServic.duration),
    price: selectedServic.cost.toString(),
  };
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(selectedServic.color);
  const [category, setCategory] = useState<string[]>(
    selectedServic.categoriesId
  );
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (colors.length > 0) {
  //     setSelectedColor(colors[0]._id.toString());
  //   }
  // }, [colors]);

  useEffect(() => {
    serviceMessageFail &&
      cogoToast.error(<div className="message">{serviceMessageFail}</div>);
  }, [serviceMessageFail]);

  useEffect(() => {
    serviceMessageSuccess &&
      cogoToast.success(<div className="message">{serviceMessageSuccess}</div>);
  }, [serviceMessageSuccess]);

  interface EditServise {
    name: string;
    time: string;
    price: string;
  }
  const handlerEditService = (values: EditServise) => {
    const data = {
      _id: selectedServic._id,
      name: values.name,
      duration: getTimeToArray(values.time),
      cost: parseInt(values.price),
      colorId: selectedColor._id,
      categoriesId: category,
    };
    dispatch(editService(data, handleClose));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string[]);
  };
  const handlerDelet = () => {
    dispatch(deletServic(selectedServic._id, handleClose));
  };
  return (
    <>
      <AreYouSure
        open={open}
        setOpen={setOpen}
        handlerDelet={handlerDelet}
        text={"Вы действительно хотите удалить услугу?"}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AddClientSchema}
        onSubmit={handlerEditService}
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

export default FormEditService;
