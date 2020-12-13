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
import { useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import SelectColor from "../../../../../../components/SelectColor";
import SettingsIcon from "@material-ui/icons/Settings";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { runAddNewService } from "../../../../../../ducks/services/actionCreators/addNewService";
import { ICategory } from "../../../../types";
import { IColor } from "../../../../../../ducks/colors/contracts/state";

export const getTime = (time: string): number[] => {
    return time.split(":").map((el) => parseInt(el.replace(/^0(\d)/, "$1")));
};

const initialValues = {
    name: "",
    time: "00:30",
    price: "",
};
const AddClientSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    price: Yup.number().required("Обязательное поле, возможно ввести только цифры"),
});

interface IFormAddService {
    handleClose: () => void;
    categoryList: ICategory[];
    colors: IColor[];
    isAdding: boolean;
}

const FormAddService = ({ handleClose, categoryList, colors, isAdding }: IFormAddService): React.ReactElement => {
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState<IColor>(colors[0]);
    const [category, setCategory] = useState<string[]>([]);

    interface IAddServise {
        name: string;
        time: string;
        price: string;
    }
    const handlerAddService = (values: IAddServise) => {
        const data = {
            name: values.name,
            duration: getTime(values.time),
            cost: parseInt(values.price),
            colorId: selectedColor._id,
            categoriesId: category,
        };
        dispatch(runAddNewService(data, handleClose));
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string[]);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={AddClientSchema} onSubmit={handlerAddService}>
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
                                    disabled={isAdding}
                                />
                            </div>
                        </div>
                        <div className="field__error">
                            <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
                        </div>
                    </div>

                    <div className="form__field field field-margin-bottom ">
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
                                    disabled={isAdding}
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
                                    disabled={isAdding}
                                />
                            </div>
                        </div>
                        <div className="field__error">
                            <FormHelperText id="component-error-text">{errors.price}</FormHelperText>
                        </div>
                    </div>

                    <div className="form__field field">
                        <div className="field__row">
                            <div className="field__icon ">
                                {" "}
                                <SettingsIcon />{" "}
                            </div>
                            <div className="field__body  field__body-size-select">
                                <FormControl>
                                    <InputLabel id="demo-mutiple-checkbox-label">Категории</InputLabel>
                                    <Select
                                        disabled={isAdding}
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={category}
                                        onChange={handleChange}
                                        input={<Input />}
                                        renderValue={(selected: any) =>
                                            selected
                                                .map((_id: string) => {
                                                    return categoryList.find((el) => el._id.toString() === _id)?.name;
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
                                                <Checkbox checked={category.indexOf(item._id.toString()) > -1} />
                                                <ListItemText primary={item.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="form__select-color select-color">
                        <div
                            className="select-color__selected select-color__selected-margin-right"
                            style={{
                                backgroundColor: selectedColor.hex,
                            }}
                        ></div>
                        <div className="select-color__button">
                            <SelectColor
                                setSelectedColor={setSelectedColor}
                                colors={colors}
                                disabled={isAdding}
                                title="Цвет услуги"
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button color="primary" type="submit" disabled={!dirty || !isValid || isAdding}>
                            Добавить
                        </Button>
                        <Button onClick={handleClose} color="primary" disabled={isAdding}>
                            Отмена
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    );
};

export default FormAddService;
