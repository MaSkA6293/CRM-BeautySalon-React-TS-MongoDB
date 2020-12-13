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

import { runDeletService } from "../../../../../../ducks/services/actionCreators/deletService";
import { runEditService } from "../../../../../../ducks/services/actionCreators/editService";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import { AreYouSure } from "../../../../../../components/AreYouSure";
import { ICategory } from "../../../../types";
import { ISelectServicesToShow } from "../../../../../../ducks/services/selector";
import { IColor } from "../../../../../../ducks/colors/contracts/state";

export const getTimeFromArray = (time: number[]): string => {
    return time
        .map((el) => {
            if (el.toString().length === 1) {
                return `0${el}`;
            } else return el;
        })
        .join(":");
};
export const getTimeToArray = (time: string): number[] => {
    return time.split(":").map((el) => parseInt(el.replace(/^0(\d)/, "$1")));
};
const AddClientSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    price: Yup.string().required("Обязательное поле"),
});

interface IFormEditService {
    categoryList: ICategory[];
    handleClose: () => void;
    selectedServic: ISelectServicesToShow;
    colors: IColor[];
    isEditing: boolean;
    isDeleting: boolean;
}

const FormEditService = ({
    handleClose,
    selectedServic,
    categoryList,
    colors,
    isEditing,
    isDeleting,
}: IFormEditService): React.ReactElement => {
    const initialValues = {
        name: selectedServic.name,
        time: getTimeFromArray(selectedServic.duration),
        price: selectedServic.cost.toString(),
    };
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState(selectedServic.color);
    const [category, setCategory] = useState<string[]>(selectedServic.categoriesId);
    const [open, setOpen] = useState(false);

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
        dispatch(runEditService(data, handleClose));
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string[]);
    };
    const handlerDelet = () => {
        dispatch(runDeletService(selectedServic._id, handleClose));
    };
    return (
        <>
            <AreYouSure
                open={open}
                setOpen={setOpen}
                handlerDelet={handlerDelet}
                text={"Вы действительно хотите удалить услугу?"}
            />
            <Formik initialValues={initialValues} validationSchema={AddClientSchema} onSubmit={handlerEditService}>
                {({ isValid, errors }) => (
                    <Form className="form">
                        <div className="form__title-btn-delet">
                            <h2 className="form__title">Редактировать</h2>
                            <Button disabled={isEditing || isDeleting} onClick={() => setOpen(true)}>
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
                                        disabled={isEditing || isDeleting}
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
                                        disabled={isEditing || isDeleting}
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
                                        disabled={isEditing || isDeleting}
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
                                            labelId="demo-mutiple-checkbox-label"
                                            id="demo-mutiple-checkbox"
                                            multiple
                                            value={category}
                                            onChange={handleChange}
                                            input={<Input />}
                                            disabled={isEditing || isDeleting}
                                            renderValue={(selected: any) =>
                                                selected
                                                    .map((_id: string) => {
                                                        return categoryList.find((el) => el._id.toString() === _id)
                                                            ?.name;
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
                                className="select-color__selected select-color__selected-margin-right "
                                style={{
                                    backgroundColor: selectedColor ? selectedColor.hex : "#4791db",
                                }}
                            ></div>
                            <div className="select-color__button">
                                <SelectColor
                                    setSelectedColor={setSelectedColor}
                                    colors={colors}
                                    disabled={isEditing || isDeleting}
                                    title="Цвет услуги"
                                />
                            </div>
                        </div>
                        <DialogActions>
                            <Button color="primary" type="submit" disabled={!isValid || isEditing || isDeleting}>
                                Сохранить
                            </Button>
                            <Button onClick={handleClose} color="primary" disabled={isEditing || isDeleting}>
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
