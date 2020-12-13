import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../../../components/Header";

import SettingsIcon from "@material-ui/icons/Settings";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import AddNewService from "../AddNewService";
import ModalAddService from "../ModalAddNewService";
import { ICategory } from "../../../../types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IColor } from "../../../../../../ducks/colors/contracts/state";
const useStyles = makeStyles({
    root: {
        color: "#fff",
        fontSize: "1.1rem",
        width: "90%",
        margin: "0 5%",
    },
});

interface IServicesHeader {
    categoryList: ICategory[];
    filter: string;
    setFilter: (value: string) => void;
    colors: IColor[];
    isAdding: boolean;
}

const ServicesHeader = ({ categoryList, setFilter, filter, colors, isAdding }: IServicesHeader): React.ReactElement => {
    const [isOpenAddService, setIsOpenAddService] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const handlerGoCategiry = () => {
        history.push("services/categories");
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <Header>
            <div className="services-header">
                <Button color="secondary" onClick={history.goBack}>
                    <ArrowBackIcon style={{ color: "white" }} />
                </Button>
                <div className="services-header__filter">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        onChange={handleChange}
                        className={classes.root}
                    >
                        <MenuItem value="all">Все услуги</MenuItem>
                        {categoryList &&
                            categoryList.map((item: ICategory, index: number) => {
                                return (
                                    <MenuItem key={index} value={item._id}>
                                        {" "}
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </div>
                <AddNewService setIsOpen={setIsOpenAddService} />
                <div className="services-header__category" onClick={() => handlerGoCategiry()}>
                    <Button>
                        <SettingsIcon style={{ color: "white" }} />
                    </Button>
                </div>
            </div>
            <ModalAddService
                open={isOpenAddService}
                handleClose={() => setIsOpenAddService(false)}
                categoryList={categoryList}
                colors={colors}
                isAdding={isAdding}
            />
        </Header>
    );
};

export default ServicesHeader;
